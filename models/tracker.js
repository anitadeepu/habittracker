const {Schema, model} = require('mongoose');

const trackerSchema = new Schema( {
    date: {type: Date, required: true,},
    done: {type: Boolean, required: true, default: true},
    habit: {type: Schema.Types.ObjectId, ref: 'Habit'}
});

const Tracker = model('Tracker', trackerSchema);

module.exports = Tracker;