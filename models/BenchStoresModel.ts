import { models } from "mongoose";

const mongoose = require('mongoose');

const benchStoreSchema = new mongoose.Schema({
  outlet_code: {
    type: String,
    required: true
  },
  outlet_name: {
    type: String,
    required: true
  },
  outlet_format: {
    type: String,
    required: true
  }
});

const benchStoresModel = models.benchStores || mongoose.model('benchStores', benchStoreSchema);

export default benchStoresModel