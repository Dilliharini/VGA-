import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import enquiriesRouter from "./enquiries.js";
import debugRouter from "./debug.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(enquiriesRouter);
router.use(debugRouter);

export default router;
