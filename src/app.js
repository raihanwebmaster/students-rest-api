const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const student = require("./models/studentSchema");
const port = process.env.PORT || 5000;
app.use(express.json());
env.config();
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.giumd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

// ******************************** Promise ********************************
// app.post("/students", (req, res) => {
//   const user = new student(req.body);
//   user.save().then(() => {
//     res.status(201).send(user);
//   }).catch((error)=>{
//       res.status(400).send(error.message);
//   })
// });

// ******************* Async Await **********************
app.post("/students", async (req, res) => {
  try {
    const user = new student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// read the data of registered Students
app.get("/students", async (req, res) => {
  try {
    const studentsData = await student.find();
    res.status(201).send(studentsData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get the indivisual of student data using id

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await student.findById(_id);
    res.status(201).send(studentData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
