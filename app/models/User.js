import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    minlength: [2, "Name must be at least 2 characters long."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [8, "Password must be at least 8 characters long."],
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
