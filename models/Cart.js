const mongoose = require('mongoose');


const  CartSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    produts:{
        cartItem:{
            type: mongoose.Schema.ObjectId,
            ref:"product"
        },
        quantity:{
            type:Number,
            default: 1,
        }
    }
},{timestamps:true});


module.exports = mongoose.model("Cart", CartSchema);