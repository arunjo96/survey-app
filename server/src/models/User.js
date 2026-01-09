import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
        name: {
        type: String,
        required: [ true, "Name is required" ],
        trim: true,
        },
        email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    role: {
        type: String,
        default: "user"
    },
    
  },
  { timestamps: true }
);

// -----becrypt password----- //

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { 
        return next();
    } 

  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);

    
});


// --compare password-- //
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

export default User;    
