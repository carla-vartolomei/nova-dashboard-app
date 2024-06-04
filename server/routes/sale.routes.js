import express from 'express';
import {
  createSale,
  getSaleByPropertyId,
  getTotalSales,
} from '../controllers/sale.controller.js';

const router = express.Router();

router.route('/').get(getTotalSales);
router.route('/').post(createSale);
router.route('/:id').get(getSaleByPropertyId);

export default router;
