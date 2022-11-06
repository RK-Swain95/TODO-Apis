const mongoose =require('mongoose');
const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
    },
    Email:{
        type:String,
        required:true 
    }
},{
    timestamps:true
});

const TODO =mongoose.model('TODO',todoSchema);
module.exports=TODO;