import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  price: { type: Number, require: true },
  date: { type: String, required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const saleModel = mongoose.model('Sale', SaleSchema);

export default saleModel;
