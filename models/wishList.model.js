import mongoose from 'mongoose'
let {Schema,model} = mongoose;
let wishlistSchema = new Schema({
    wishProduct : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    username : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
},{timestamps : true });
export default model('wishlist',wishlistSchema);