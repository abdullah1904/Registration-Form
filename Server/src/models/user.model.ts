import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
});

UserSchema.set("autoIndex", false);

const User = model("User", UserSchema);
export default User;