const {Schema, model} = require('mongoose');

const habitSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User'}

});

const Habit = model('Habit',habitSchema);
module.exports = Habit;