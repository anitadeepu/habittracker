const {Schema, model} = require('mongoose');

const habitSchema = new Schema({
    createdOn: {type: Date, required: true, default: Date.now},
    name: {type: String, required: true},
    tracker:[{
        date:{type: Date, required: true},
        done:{type:Boolean, required: true},
    }],
    user: {type: Schema.Types.ObjectId, ref:'User'}

});

const Habit = model('Habit',habitSchema);
module.exports = Habit;