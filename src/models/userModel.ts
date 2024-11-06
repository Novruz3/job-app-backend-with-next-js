import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      default: "employee",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    // additinial fields for employee
    skils: {
      type: [],
      required: false,
    },
    experience: {
      type: [],
      required: false,
    },
    education: {
      type: [],
      required: false,
    },
    carrierObjective: {
      type: String,
      required: false,
    },

    // additinial fields for employer
    establishmentYear: {
      type: String,
      required: false,
    },
    companySize: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// delete old model
if (mongoose.models.users) {
  const userModel = mongoose.model("users")
  mongoose.deleteModel(userModel.modelName)
}

//create new model
const User = mongoose.model("users", userSchema);
export default User;
