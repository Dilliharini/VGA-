import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router, type IRouter } from "express";
import { db, enquiriesTable } from "@workspace/db";
import { logger } from "../lib/logger";
import { Resend } from "resend";

const router: IRouter = Router();
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL ?? "muthukumarvga@gmail.com";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.resolve(__dirname, "../.env");

function getEnvValue(key: string): string | undefined {
  if (process.env[key]) return process.env[key];
  if (!fs.existsSync(envFilePath)) return undefined;
  const content = fs.readFileSync(envFilePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [envKey, ...envValueParts] = trimmed.split("=");
    if (envKey === key) {
      return envValueParts.join("=").trim();
    }
  }
  return undefined;
}

function getResend(): Resend | null {
  const apiKey = getEnvValue("RESEND_API_KEY");
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function buildEmailHtml(data: {
  name: string;
  phone: string;
  location: string;
  notes?: string | null;
  date: string;
  items: Array<{ name: string; category: string; quantity: number; unit: string }>;
}): string {
  const itemRows = data.items.length
    ? data.items
        .map(
          (item) =>
            `<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0">${item.name}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;color:#666">${item.category}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right">${item.quantity} ${item.unit}</td>
            </tr>`
        )
        .join("")
    : `<tr><td colspan="3" style="padding:12px;color:#999;text-align:center">No items selected</td></tr>`;

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:#1a3a5c;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px">New Order Enquiry — VGA</h1>
        <p style="color:rgba(255,255,255,0.65);margin:6px 0 0;font-size:14px">Vallaba Ganapathy Associates</p>
      </div>
      <div style="padding:28px 32px">
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr><td style="padding:6px 0;color:#888;font-size:13px;width:130px">Date and Time</td><td style="padding:6px 0;font-weight:600">${data.date}</td></tr>
          <tr><td style="padding:6px 0;color:#888;font-size:13px;width:130px">Name</td><td style="padding:6px 0;font-weight:600">${data.name}</td></tr>
          <tr><td style="padding:6px 0;color:#888;font-size:13px">Phone</td><td style="padding:6px 0;font-weight:600">${data.phone}</td></tr>
          <tr><td style="padding:6px 0;color:#888;font-size:13px">Delivery Location</td><td style="padding:6px 0">${data.location}</td></tr>
          ${data.notes ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;vertical-align:top">Notes</td><td style="padding:6px 0">${data.notes}</td></tr>` : ""}
        </table>

        <h3 style="margin:0 0 12px;font-size:15px;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px">Materials Requested</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead>
            <tr style="background:#f8f9fa">
              <th style="padding:8px 12px;text-align:left;color:#555;font-weight:600">Product</th>
              <th style="padding:8px 12px;text-align:left;color:#555;font-weight:600">Category</th>
              <th style="padding:8px 12px;text-align:right;color:#555;font-weight:600">Quantity</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="margin-top:28px;padding:16px;background:#f0f7ff;border-radius:8px;font-size:13px;color:#555">
          Reply directly to this email or call <strong>${data.phone}</strong> to follow up.
        </div>
      </div>
      <div style="padding:16px 32px;background:#f8f9fa;font-size:12px;color:#999;text-align:center">
        This enquiry was submitted via the VGA website
      </div>
    </div>
  `;
}

router.post("/enquiries", async (req, res): Promise<void> => {
  const { name, phone, location, notes, items } = req.body;

  if (!name || !phone || !location) {
    res.status(400).json({ error: "name, phone, and location are required" });
    return;
  }

  const safeItems = Array.isArray(items) ? items : [];

  let enquiry;
  try {
    [enquiry] = await db
      .insert(enquiriesTable)
      .values({ name, phone, location, notes: notes || null, items: safeItems })
      .returning();
  } catch (dbError) {
    req.log.error({ err: dbError }, "Failed to save enquiry to database");
    res.status(500).json({ error: "The enquiry could not be stored. Configure DATABASE_URL in Vercel." });
    return;
  }

  req.log.info({ enquiryId: enquiry.id }, "Enquiry saved to database");

  const resend = getResend();
  if (!resend) {
    logger.error("RESEND_API_KEY not set — email not sent");
    res.status(500).json({ error: "RESEND_API_KEY must be set as a Vercel environment variable." });
    return;
  }

  const resendFromEmail = getEnvValue("RESEND_FROM_EMAIL");
  if (!resendFromEmail) {
    logger.error("RESEND_FROM_EMAIL not set — email sender not configured");
    res.status(500).json({ error: "RESEND_FROM_EMAIL must be set as a Vercel environment variable." });
    return;
  }

  try {
    const response = await resend.emails.send({
      from: `VGA Enquiries <${resendFromEmail}>`,
      to: [RESEND_TO_EMAIL],
      replyTo: resendFromEmail,
      subject: `New Order Enquiry from ${name} — VGA Website`,
      html: buildEmailHtml({
        name,
        phone,
        location,
        notes,
        date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        items: safeItems,
      }),
    });

    if (response.error) {
      req.log.error({ error: response.error }, "Resend API returned an error");
      const errorMessage = response.error?.message ?? "Failed to send enquiry email";
      const friendlyMessage = /domain.*not verified/i.test(errorMessage)
        ? `${errorMessage}. Verify RESEND_FROM_EMAIL domain at https://resend.com/domains.`
        : errorMessage;
      res.status(502).json({ error: friendlyMessage });
      return;
    }

    req.log.info({ enquiryId: enquiry.id, data: response.data }, "Enquiry email sent successfully");
    res.status(201).json({ success: true, id: enquiry.id });
  } catch (err) {
    req.log.error({ err }, "Failed to send enquiry email");
    const errorMessage = err instanceof Error ? err.message : "Failed to send enquiry email";
    const friendlyMessage = /domain.*not verified/i.test(errorMessage)
      ? `${errorMessage}. Verify RESEND_FROM_EMAIL domain at https://resend.com/domains.`
      : errorMessage;
    res.status(502).json({ error: friendlyMessage });
  }
});

export default router;
