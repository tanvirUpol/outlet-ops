import { models } from "mongoose";

const mongoose = require('mongoose');

const catLevelSchema = new mongoose.Schema({
  outlet_code: {
    type: String,
    required: true
  },
  outlet_name: {
    type: String,
    required: true
  },
  zonal: {
    type: String,
    required: true
  },
  master_category: {
    type: String,
    required: true
  },
  cat_1: {
    type: String,
    required: true
  },
  cat_3: {
    type: String,
    required: true
  },
  sales_this: {
    type: String,
    required: true
  },
  sales_last: {
    type: String,
    required: true
  },
  ff_this: {
    type: String,
    required: true
  },
  ff_last: {
    type: String,
    required: true
  },
  bs_this: {
    type: String,
    required: true
  },
  bs_last: {
    type: String,
    required: true
  },
  gpv_this: {
    type: String,
    required: true
  },
  gpv_last: {
    type: String,
    required: true
  },
  format_sales_gr: {
    type: String,
    required: true
  },
  format_ff_gr: {
    type: String,
    required: true
  },
  format_bs_gr: {
    type: String,
    required: true
  },
  format_gpv_gr: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  }
});

const catLevelModel = models.catLevel || mongoose.model('catLevel', catLevelSchema);

export default catLevelModel