const express = require('express');
const router = express.Router();
const task = require ('../models/task');



 

// PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. Es decir, que no me deje cambiar el campo “completed” desde este endpoint, sino solo, el título.
// DELETE /id/:_id: Endpoint para eliminar una tarea.


// POST /create: Endpoint para crear una tarea.
router.post("/create", async(req, res) => {
  try {
      const task = await Task.create({...req.body, completed: false });
      res.status(201).send({ message: "Task successfully created", task });
  } catch (error) {
      console.error(error);
      res
          .status(500)
          .send({ message: "There was a problem trying to create a task" });
  }
});
  
// GET /: Endpoint para traer todas las tareas.
router.get("/", async(req, res) => {
  try {
      const tasks = await Task.find();
      res.send(tasks);
  } catch (error) {
      console.error(error);
  }
});

//   GET /id/:_id: Endpoint para buscar tarea por id.
router.get("/id/:_id", async(req, res) => {
  try {
      const task = await Task.findById(req.params._id);
      res.send(task);
  } catch (error) {
      console.error(error);
      res.status(500).send({
          message: "There was a problem with the task with _id number: " +
              req.params._id,
      });
  }
}, )

  // PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.

  router.put("/markAsCompleted/:_id", async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id, {
                completed: true,
            }, { new: true }
        );
        res.send({ message: "Task successfully updated", task });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "There was a problem trying to update the task with _id: " +
                req.params._id,
        });
    }
}),

//   The Mongoose Queries findByIdAndUpdate() function is used to search 
//   for a matching document, update it in accordance with the update argument while giving any 
//   options, then return the found document (if any) to the callback.




    router.put("/id/:_id", async(req, res) => {
      try {
          const task = await Task.findByIdAndUpdate(req.params._id, req.body, { new: true })
          res.send({ message: "task successfully updated", task });
      } catch (error) {
          console.error(error);
      }
  }),


  router.delete("/id/:_id", async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        res.send({ message: "task deleted", task });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to delete a task" });
    }
})


module.exports = router;