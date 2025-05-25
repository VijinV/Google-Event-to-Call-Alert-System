import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    googleAccessToken: String,
    googleRefreshToken: String,
    events: Array,
    phoneNumber: String,
    tokenIssuedAt: Date,
    image: String,
    calls: Array,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
