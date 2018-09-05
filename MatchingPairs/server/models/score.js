const mongoose=require('mongoose');
const Schema=mongoose.Schema;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://'+process.env.USER_NAME+':'+process.env.USER_PASSWORD+'@ds243212.mlab.com:43212/matchingpairs',{useNewUrlParser: true});

const scoreSchema = new Schema({
    Name: {
        type:String
    },

    Score: {
        type: String
    },

    Missed: {
        type: String
    },

    Difficulty: {
        type:String
    },

});

module.exports = mongoose.model('UserScore',scoreSchema);