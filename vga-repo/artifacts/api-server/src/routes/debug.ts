import { Router } from "express";

const router = Router();

router.get("/_debug/resend-key", (_req, res) => {
  const key = process.env["RESEND_API_KEY"] || "";
  const first10 = key.slice(0, 10);
  res.json({ first10 });
});

export default router;
