const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();

mongoose
  .connect("mongodb+srv://mj3468246:mohit12@cluster0.3cpehx1.mongodb.net")
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.error(error);
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const havUser = await User.findOne({ email: email });
  if (havUser) {
    return res.status(200).json({ message: "haveUser", status: 12 });
  }
  try {
    const signup = await new User({ name, email, password }).save();
    res.status(201).json({ message: "User Saved", status: 10, signup });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await User.findOne({ email: email });
    if (!data) {
      return res.status(200).json({ message: "User not found", status: 13 });
    }
    if (data.password !== password) {
      return res.status(200).json({ message: "Password invald", status: 14 });
    }
    res.status(200).json({ message: "user Login", status: 11, data });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const Student = mongoose.model("Student", {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  techerId: {
    type: String,
    required: true,
  },
});

app.post("/student", async (req, res) => {
  const { name, age, gender, techerId } = req.body;
  try {
    const stud = await new Student({
      name: name,
      age: age,
      gender: gender,
      techerId: techerId,
    }).save();
    res.status(200).json({ message: "Student save", status: 20, stud });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/allstudnt", async (req, res) => {
  const { techerId } = req.body;
  try {
    const data = await Student.find({ techerId: techerId });
    res.status(200).json({ message: "all student", data });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/delete/:id" , async (req, res)=>{
    const userId  = req.params.id;
    try {
      const deleteUser  = await Student.findByIdAndDelete({_id : userId})
      res.status(200).json({message:"User delete", status :15, deleteUser })
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
})