import mongoose, { Schema, models } from "mongoose";

const achievementSchema = new Schema({
    outlet_division: { type: String, required: true },
    outlet_format: { type: String, required: true },
    outlet_name: { type: String, required: true },
    outlet_code: { type: String, required: true },
    cat_3: { type: String, required: true },
    achievement_target: [
        {
            date: { type: String, required: true },
            target: { type: Number, required: true },
        },
    ],
    total_target: { type: Number, required: true },
    month: { type: String, required: true },
});

// Create a function to handle data creation or update
achievementSchema.statics.createOrUpdateDataArray = async function (dataArray) {
    try {
        // Extract unique months and outlet names from the array
        const uniqueCombos = new Set(dataArray.map(data => `${data.outlet_name}_${data.month}`));
        console.log(uniqueCombos);
        // Iterate through unique combinations
        for (const combo of uniqueCombos) {
            const [outletName, month] = combo.split('_');

            // Check if data with the same month and outlet_name already exists
            const existingData = await this.findOne({ outlet_name: outletName, month });

            if (existingData) {
                // If data with the same month and outlet_name exists, delete it
                await this.deleteOne({ outlet_name: outletName, month });
            }

            // Create new data
            const newDataArray = dataArray
                .filter(data => data.outlet_name === outletName && data.month === month)
                .map(data => ({
                    outlet_name: data.outlet_name,
                    month: data.month,
                    achievement_target: data.achievement_target,
                    total_target: data.total_target,
                    outlet_division: data.outlet_division,
                    outlet_format: data.outlet_format,
                    outlet_code: data.outlet_code,
                    cat_3: data.cat_3,
                    // Add other properties as needed
                }));

            await this.insertMany(newDataArray);
        }

        return true;
    } catch (error) {
        console.error('Error creating or updating data array:', error);
        throw error;
    }
};


const AchievementModel = models.achievement || mongoose.model('achievement', achievementSchema);





export default AchievementModel;
