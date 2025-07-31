import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: [true, "Email already exists"],
            required: [true, "Email is required"],
        },
        name: String,
        password: {
            type: String,
            required: [true, "Password is required"],
        }
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
