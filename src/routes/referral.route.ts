import express from 'express';
import { createReferral, getReferrals}  from '../controllers/referral.controller';
import { asyncHandler } from '../utils/asyncHandler';


const router = express.Router();

router.get('/',asyncHandler(getReferrals));
router.post('/',asyncHandler(createReferral));

export default router;  