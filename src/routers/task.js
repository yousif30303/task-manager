const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/task',auth,async(reg,res)=>{
    const tasks = new Task({
        ...reg.body,
        owner:reg.user._id
    })

    try{
       await tasks.save()
       res.status(201).send(tasks)
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get('/tasks',auth,async(reg,res)=>{
    const match = {}
    const sort = {}
    if(reg.query.completed){
        match.completed = reg.query.completed === 'true'
    }
    if(reg.query.sortBy){
        const parts = reg.query.sortBy.split(":")
        sort[parts[0]] = parts[1] ==='desc'? -1 : 1
    }

    try{
        await reg.user.populate({path:'tasks', 
        model: Task , 
        match , 
        options:{limit:parseInt(reg.query.limit),skip:parseInt(reg.query.skip),sort}
    }).execPopulate()

        res.send(reg.user.tasks)
       /* const tasks = await Task.find({owner:reg.user._id})
       res.send(tasks) */
    }
    catch(e){
        res.status(500).send(tasks)
    }
    
})

router.get('/task/:id',auth,async(reg,res)=>{
    const _id = reg.params.id
    try{
        const task = await Task.findOne({_id,owner:reg.user._id})
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        
    }
    catch(e){
        res.status(500).send(e)
    }
    
})

router.patch('/task/:id',auth,async(reg,res)=>{
    try{
        const updates = Object.keys(reg.body)
        const updatavalid = ['describtion','completed']
        const isValid = updates.every((update)=>
        updatavalid.includes(update)
    )

    if(!isValid){
        return res.status(400).send({'error':'send valid data'})
    }
    const task = await Task.findOne({_id:reg.params.id,owner:reg.user._id})
    
    //const task = await Task.findByIdAndUpdate(reg.params.id,reg.body,{new:true,runValidators:true})
    if(!task){
        return res.status(404).send()
     }
     updates.forEach((update)=>{
        task[update] = reg.body[update]
    })

    await task.save()
     res.send(task)    
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.delete('/task/:id',auth,async(reg,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:reg.params.id,owner:reg.user._id})
        if(!task){
         return  res.status(404).send(task)
        }
        res.send(task)
    }   
    catch(e){
        res.status(400).send(e)
    } 
})

module.exports = router