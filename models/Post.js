var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    avatar:{
        type:String
    },
    likes:[{
        user:{
            type:Schema.Types.ObjectId,
            ref:"users",
            required:true
        }
    }],
    comments:[{
        user:{
            type:Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        text:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true,
        },
        avatar:{
            type:String
        },
        Date:{
            type:Date,
            default: Date.now
        }
    }],
    date:{
        type:Date,
        default: Date.now
    }
});

var postModel = mongoose.model("posts",profileSchema);

module.exports = postModel;