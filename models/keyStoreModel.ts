import mongoose, { Schema, models } from "mongoose";

const keyStoreSchema = new Schema({
    outlet_code: {
        type: String,
        required: true,
    },
    outlet_status: {
        type: String,
        required: true,
    },
    outlet_name: {
        type: String,
        required: true,
    },
    outlet_format: {
        type: String,
        required: true,
    },
    outlet_cluster: {
        type: String,
        required: true,
    },
    outlet_division: {
        type: String,
        required: true,
    },
    outlet_zone: {
        type: String,
        required: true,
    },

},
{timestamps: true})

const keyStoreModel = models.keyStore || mongoose.model("keyStore", keyStoreSchema)

export default keyStoreModel;


