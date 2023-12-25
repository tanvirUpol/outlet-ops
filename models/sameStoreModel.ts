import mongoose, { models } from 'mongoose';

const sameStoreSchema = new mongoose.Schema({
  outlet_code: {
    type: Array,
    required: true
  }
});

const sameStoreModel = models.sameStore || mongoose.model('sameStore', sameStoreSchema);

export default sameStoreModel;
