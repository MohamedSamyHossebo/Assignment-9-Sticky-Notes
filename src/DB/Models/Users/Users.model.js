import { Schema,mongoose } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 60
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
});

const UserModel=mongoose.model("User",userSchema);
export default UserModel;
