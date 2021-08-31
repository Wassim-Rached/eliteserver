import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileImg:{type: String,required:true,default:"defaultProfileImg.jpg"},
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isBanned: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
