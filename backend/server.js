import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { UserSchema } from "./models/user";
import { PostSchema } from "./models/post";

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema)


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


//AUTHORIZATION USER
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}


// // GET SINGLE USER's PROFILE
//app.get('/users/:id', authenticateUser)
app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  try {    
    if (id) {
      const userPage = await User.findById(id)
      const savedQuestionItems = [
        // {
        //   'name': 'johanna', 
        //   'age': '30'
        // },
      {
        'name': 'alfred', 
        'age': '35',
       born: 
        {'happy': 'YES'}
      
      },
    ]
      for(const collectedQuestion of userPage.savedQuestion) {
        const questionObject = await Question.findById(collectedQuestion)
        savedQuestionItems.push(questionObject)
      } 
      res.status(200).json({
        success: true,
        username: userPage.username,
        id: userPage.id,
        motivation: userPage.motivation,
        savedQuestion: savedQuestionItems

      })
    } else {
      res.status(404).json({ error: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' })
  }
})



// UPDATE USER MOTIVATION
app.put("/:id/updateMotivation", async (req, res) => {
  const { score} = req.body; 
  const { id } = req.params
  try {
    const user = await User.findByIdAndUpdate(id, { motivation: score });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ 
      message: "Motivation updated successfully",
      motivation: score
    });
  } catch (error) {
    console.error("Error updating motivation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


 //GET ALL USERS
 app.get("/users", async (req, res)=> {
  const users = await User.find({});
  res.status(200).json({
    success: true, 
    response: users
  }); 
});


//DELETE USER 
app.delete("/user/:id/delete", authenticateUser)
app.delete("/user/:id/delete", async (req, res) => {
  const { id } = req.params
  try {
    const deleteUser = await User.findByIdAndRemove(id)

    if (deleteUser) {
      res.status(200).json({
        success: true,
        message: "User deleted from Database",
        response: deleteUser
      })
    } else {
      res.status(404).json({
        success: false,
        response: "Could not find user in Database"
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: "Could not delete user to database"
    })
  }
})

// app.get("/posts", authenticateUser, async (req, res)=> {
app.get("/posts", async (req, res)=> {
  try {
  const posts = await Post.find().sort({createdAt: 'desc'}).limit(10).exec() 
  res.status(200).json({
    success: true, 
    response: posts,
    // answer: posts.answers
  }); 
} catch (err) {
  res.status(400).json({
    success: false,
    message: 'Invalid request for questions'
  })
}
})


// POST QUESTION BY AUTH USER 
// app.post("/posts", authenticateUser, async (req, res) => {
  app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const { message } = req.body;
  // const { authorId } = req.body;
  try {
    const newPost = await new Post({
      title,
      message,
      // author: User.username
    }).save();
    if (newPost) {
      res.status(201).json({
        success: true, 
        response: {
        _id: newPost._id,
        // author: newPost.author,
         message: newPost.message,
         likes: newPost.likes,
         disLikes: newPost.disLikes,
         answer: newPost.answers
       }
      });
    }
  } catch (error) {
    res.status(400).json({
        success: false, 
        response: error
    });
  }
});

// DELETE QUESTION BY ID
app.delete('/posts/:postId/delete', async (req, res) => {
  const { postId } = req.params
  try {
    const deletedQuestionById = await Post.findByIdAndDelete(postId)
    if (deletedQuestionById) {
      res.json({
        success: true, deletedQuestionById,
        message: 'Question is deleted'
      })
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Question with this ID could not be deleted'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid delete question request', error })
  }
})

//PATCH ANSWER TO A QUESTION 
app.patch('/posts/:postId/answer', async (req, res) => {
  const { postId } = req.params
  const { answer } = req.body
  try {
    const updatedQuestion = await Post.findByIdAndUpdate(postId, {
      $push: {
        answers: {
          answer,
        }}}, {new: true} 
    )
    if (updatedQuestion) {
      res.status(201).json({
        success: true,
        question: {
         response: `Post ${updatedQuestion.answers} it is updated`,
          _id: updatedQuestion._id,
          message: updatedQuestion.message,
          answer: updatedQuestion.answers,
          createdAt: updatedQuestion.createdAt,
        }
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not answer post' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})


app.patch('/posts/:questionId/answers/:answerId/like', (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.questionId, "answers._id": req.params.answerId },
    { $inc: {"answers.$.like": 1}},
    { new: true }
  )
  .then((post) => {
    res.json({
      success: true,
      response: post
    });
    })
    .catch((err) => {
      res.json({
        success: false,
        response: err
    });
  });
});

// DELETE ANSWER BY ID - WORKS IN POSTMAN!
app.delete('/posts/:questionId/answers/:answerId', async (req, res) => {
  const { answerId, questionId } = req.params 
  try {
    const deletedAnswerById = await Post.findOneAndUpdate(
      { _id: req.params.questionId, "answers._id": req.params.answerId }, 
      {$pull: {answers: {_id: answerId}}})
          console.log(deletedAnswerById, 'deletetd answer')
    if (deletedAnswerById) {
      res.json({
        success: true, deletedAnswerById,
        message: 'Answer is deleted'
      })
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Answer could not be deleted'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid request', error })
  }
})


//PATCH LIKES TO QUESTION
app.patch('/posts/:postId/like', async (req, res) => {
  const { postId } = req.params
  try {
  const updatedQuestion = await Post.findByIdAndUpdate(postId, {$inc: {likes: 1}},  
   )
    if (updatedQuestion) {
      res.json({ 
        success: true,
         response: `Question ${updatedQuestion.id} has updated likes`,
        _id: updatedQuestion._id,
      });
    } else {
      res.status(404).json({
         success: false, 
         message: 'Could not like question' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid like question request', error })
  }
})


// // ANSWER BY ID 
// app.get('/posts/:post_id/answer/:answer_id', function(req, res){
//   Post.findById(req.params.question_id, function(err, Posts) {
//     console.log(req.params.answer_id);
//     var doc = Posts.answers.id(req.params.answer_id);
//     console.log(doc);
//   });
// });

app.get("/", (req, res) => {
  res.send("My fullstack project");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});