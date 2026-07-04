import { Router, type IRouter } from "express";
import healthRouter from "./health";
import enquiriesRouter from "./enquiries";
import debugRouter from "./debug";

const router: IRouter = Router();

router.use(healthRouter);
router.use(enquiriesRouter);
router.use(debugRouter);

export default router;
