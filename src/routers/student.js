const express = require("express");
const router = new express.Router();
const Student = require("../models/studentSchema");

router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// read the data of registered Students
router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(201).send(studentsData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get the indivisual of student data using id

router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    res.status(201).send(studentData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update the students by it id
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(updateStudent);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete the students by it id
router.delete("/students/:id", async (req, res) => {
  ``;
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(_id);
    if (!_id) {
      return res.status(400).send("id dose not here");
    }
    res.send(deleteStudent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
