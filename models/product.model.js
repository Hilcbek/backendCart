import mongoose from "mongoose";
var productSchema = new mongoose.Schema({
    Pname :{
        type:String,
        required:true,
        unique : true
    },
    type :{
        type:String,
        required:true,
    },
    images :{
        type : [],
        required : true
    },
    desc:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating : {
        type : Number,
        default : 0,
        min : 0,
        max : 5
    },
    itemAmount : {
        type : Number,
        default : 1
    }
}, { timestamps : true });
export default mongoose.model('product', productSchema);