import mongoose, { models } from 'mongoose';

const UserSchema = new mongoose.Schema(  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    outlets: {
      type: Array,
      require: true
    },
    vcode: {
      type: String,
      default: ""
      // require: true
    },
    lastActive: {
      type: Date,
      // default: ""
    },
    activityCount: {
      type: Number,
      default: 0
    }

  },);

const UserSchemaModel = models.User || mongoose.model('User', UserSchema);

export default UserSchemaModel;
