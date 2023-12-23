import mongoose, { models } from 'mongoose';
const Schema = mongoose.Schema;

const TargetSchema = new Schema({
  zonal: {
    type: String,
    required: true
  },
  sales_t: {
    type: Number,
    required: true
  },
  sales_a: {
    type: Number,
    required: true
  },
  gpv_t: {
    type: Number,
    required: true
  },
  gpv_a: {
    type: Number,
    required: true
  },
  profit_t: {
    type: Number,
    required: true
  },
  profit_a: {
    type: Number,
    required: true
  },
  churn_t: {
    type: Number,
    required: true
  },
  churn_a: {
    type: Number,
    required: true
  },
  reactivation_t: {
    type: Number,
    required: true
  },
  reactivation_a: {
    type: Number,
    required: true
  },
  ff_t: {
    type: Number,
    required: true
  },
  ff_a: {
    type: Number,
    required: true
  }
});

const TargetShemaModel = models.TargetModel || mongoose.model('TargetModel', TargetSchema);

export default TargetShemaModel;
