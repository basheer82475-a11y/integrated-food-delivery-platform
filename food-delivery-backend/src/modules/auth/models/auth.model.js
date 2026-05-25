const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "delivery"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| Hash Password Before Save
|--------------------------------------------------------------------------
*/

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

/*
|--------------------------------------------------------------------------
| Compare Password Method
|--------------------------------------------------------------------------
*/

authSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
