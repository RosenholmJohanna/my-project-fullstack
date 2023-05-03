import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { UserSchema } from "./models/user";

const User = mongoose.model("User", UserSchema);


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/my-fullstack-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to the Database successfully')
}); mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(listEndpoints(app))
  });


// USER REGISTRATION 
app.post("/register",  async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 3) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 3 characters long"
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      });
    }
  } catch(error) {
      res.status(400).json({
        success: false,
        response: error
      });
  }
});

// USER LOGIN 
app.post("/login", async (req, res) => {
  const { username, password} = req.body;
  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken,
          savedQuestion: user.savedQuestion
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
});


// // AUTHORIZATION USER
// const authenticateUser = async (req, res, next) => {
//   const accessToken = req.header("Authorization");
//   try {
//     const user = await User.findOne({accessToken: accessToken});
//     if (user) {
//       // req.user = user //User ?
//       next();
//     } else {
//       res.status(401).json({
//         response: "Please log in",
//         success: false
//       })
//     }
//   } catch (error) {
//     res.status(400).json({
//       response: error,
//       success: false
//     })
//   }
// }

 //GET ALL USERS
 app.get("/users", async (req, res)=> {
  const users = await User.find({});
  res.status(200).json({
    success: true, 
    response: users
  }); 
});


app.get("/", (req, res) => {
  res.send("My fullstack project");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

