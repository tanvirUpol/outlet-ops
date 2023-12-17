import mongoose, { models } from 'mongoose';

const storeLevelSchema = new mongoose.Schema({
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
  sales_contribution: {
    type: String,
    required: true
  },
  this_net_profit: {
    type: String,
    required: true
  },
  profitable: {
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
  sales_this: {
    type: String,
    required: true
  },
  sales_last: {
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
  },
  outlet_zone: {
    type: String,
    required: true
  },
  outlet_division: {
    type: String,
    required: true
  },
  outlet_status: {
    type: String,
    required: true
  },
  outlet_format: {
    type: String,
    required: true
  }
});

const storeLevelModel = models.storeLevel || mongoose.model('storeLevel', storeLevelSchema);

export default storeLevelModel;
