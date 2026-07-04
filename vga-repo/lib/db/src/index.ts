import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let pool;
let dbObj: any;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  dbObj = drizzle(pool, { schema });
} else if (process.env.NODE_ENV === "production") {
  console.error("DATABASE_URL is missing. Configure a PostgreSQL connection string for production deployments.");
  dbObj = {
    insert: () => ({
      values: () => ({
        returning: async () => {
          throw new Error("DATABASE_URL is missing. Configure a PostgreSQL connection string for production deployments.");
        },
      }),
    }),
  };
} else {
  console.warn("DATABASE_URL is missing. Database operations will be mocked for local development.");
  dbObj = {
    insert: () => ({
      values: () => ({
        returning: () => Promise.resolve([{ id: Math.floor(Math.random() * 1000) }]),
      }),
    }),
  };
}

export { pool };
export const db = dbObj;

export { enquiriesTable, insertEnquirySchema, type InsertEnquiry, type Enquiry } from "./schema/enquiries";
export * from "./schema";
