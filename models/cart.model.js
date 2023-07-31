import mongoose from 'mongoose'
let {Schema,model} = mongoose;
let CartSchema = new Schema({
    cartProduct : [
        {
            type : mongoose.Types.ObjectId,
            ref : 'product'
        }
    ],
    user_id : {
        type : String
    },
    Total : {
        type : Number,
        default : 0
    }
},{timestamps : true });
export default model('cart',CartSchema);