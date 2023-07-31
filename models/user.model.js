import mongoose from "mongoose";
let {Schema,model} = mongoose;
let UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        min : 2,
        max : 20,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    profile : {
        type : String,
        default : 'https://img.freepik.com/free-icon/user_318-159711.jpg'
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
},{ timestamps : true });
export default model('users',UserSchema);