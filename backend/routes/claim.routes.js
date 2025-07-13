import express from 'express'
import { claimPoints, getAllClaims, getClaimsByUser } from '../controllers/claim.controller.js';

const router = express.Router()

router.post('/' , claimPoints)

router.get('/' , getAllClaims)

router.get('/user:userId' , getClaimsByUser)

export default router;