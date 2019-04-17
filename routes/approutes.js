const express = require('express')

const Task = require('../models/appmodel')
const router = new express.Router()

router.get('/tasks', async (req, res) => {
   

    Task.getAllTask(function(err, task) {

        console.log('controller')
        if (err)
          res.send(err);
          console.log('res', task);
        res.send(task);
      });
})


router.post('/tasks',  async (req, res) => {
  
  var new_task = new Task(req.body);

  //handles null error 
   if(!new_task.task || !new_task.status){

            res.status(400).send({ error:true, message: 'Please provide task/status' });

        }
    else{
      
      Task.createTask(new_task, function(err, task) {
        
        try
        {
          res.status(201).json(task);
        }catch(e)
        {
          res.status(400).send(e)
        }
        
      });

      }

})


router.get('/tasks/:id',  async (req, res) => {
  

  Task.getTaskById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
})



router.patch('/tasks/:id', async (req, res) => {
  Task.updateById(req.params.id, new Task(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
})

router.delete('/tasks/:id',async (req, res) => {
  // try {
  //     const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

  //     if (!task) {
  //         res.status(404).send()
  //     }

  //     res.send(task)
  // } catch (e) {
  //     res.status(500).send()
  // }


  Task.remove( req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
})




module.exports = router