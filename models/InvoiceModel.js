import mongoose, { Schema, models } from "mongoose";

const invoiceSchema = new Schema({
    outlet_code: { type: String, required: true },
    cat_3: { type: String, required: true },
    month: { type: String, required: true },
    date: { type: String, required: true },
    total_sales: { type: Number, required: true },
});



const InvoiceModel = models.invoice || mongoose.model('invoice', invoiceSchema);


export default InvoiceModel;
