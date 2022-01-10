const { getBaseDirectory } = require('prettier');
const Habit = require('./../models/Habit');
const Tracker = require('./../models/Tracker');


exports.createHabit = async(req ,res) => {

    const { body } = req;   
    const {user} = req;
    try {

       const newHabit = await Habit.create({
           name: body.name,
           user: user
       })


       return res.status(200).json({message:'Habit Created', newHabit})
           
    } catch (error) {
       return res.status(400).json({message:'Error happened'})     
    }
}

exports.viewHabits = async(req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    const skipRows = (page - 1) * pageSize; 
    const {user} = req;
    try {
        const habits = await Habit.find({user:user}).skip(skipRows).limit(pageSize);

        return res.status(200).json({message:'list of habits', habits});

    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}

exports.updateHabitById = async(req, res) => {
    const { body } = req;
   
    
    try {
        
        const habitToUpdate = await Habit.findByIdAndUpdate(req.params.id, {
            name: body.name
        }, {new:true})

        if(!habitToUpdate) return res.status(404).json({message:'habit not found'});

        return res.status(200).json({message:'habit updated', habitToUpdate})
    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}


exports.viewHabitById = async(req, res) => {
    
    try {
        const habit = await Habit.findById(req.params.id);
        if(!habit) return res.status(404).json({message: 'habit not found'});

        return res.status(200).json({message: 'habit', habit})
    } catch(error) {
        return res.status(400).json({message: 'Error happened'})
    }
}

exports.deleteHabitById = async (req, res) =>{
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id);
         
        if(!habit) return res.status(404).json({message: 'habit not found'});

        return res.status(200).json({message: 'habit deleted'}); 
        
       } catch(error) {
        return res.status(400).json({message: 'Error happened'});
    }
}

exports.trackHabit = async (req, res) => {
    try {
        const {body} = req;
        //console.log(body);
        const habit = await Habit.findById(body.habit_id);
        const trackers = habit.tracker;
       
        const dateIndex = trackers.findIndex(tracker => tracker.date.toISOString() === body.date);

        if(dateIndex >= 0) {
            trackers[dateIndex].done = body.done;
        }else {


         habit.tracker.push({
           date: body.date,
           done: body.done
       });
    }
       habit.save();
       //console.log(newTracker);
       return res.status(200).json({message: 'habit tracked', tracker: habit.tracker});


    } catch(error) {
        console.log(error);
        return res.status(400).json({message:'error happened'});
    }
}