const router = require("express").Router();
const Workout = require("../models/workout.js");

// Lets user post workout.
router.post("/api/workouts", (req, res)=>{
    Workout.create({})
        .then(dbWorkout =>{
            res.json(dbWorkout);
        })
        .catch(err =>{
            res.status(400).json(err);
        });
});

//Lets user post workout to the one already posted.
router.put("/api/workouts/:id", (req, res)=>{
    Workout.findByIdAndUpdate(req.params.id,
        {$push:{exercises:req.body}},
        { new: true, runValidators: true })
    .then(dbWorkout=>{
        res.json(dbWorkout);
    })
    .catch(err =>{
        res.status(400).json(err);
    });
})


// Lets user view the workouts.
router.get("/api/workouts", (req, res)=>{
    Workout.find({})
        .then(dbWorkout =>{
            res.json(dbWorkout);
        })
        .catch(err =>{
            res.status(400).json(err);
        });
});


// lets the user view the workout with limited numbers.
router.get("/api/workouts/range", (req, res)=>{
    Workout.find({}).limit(20)
        .then(dbWorkout =>{
            res.json(dbWorkout);
        })
        .catch(err =>{
            res.status(400).json(err);
        });
});

module.exports = router;
