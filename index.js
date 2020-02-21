// code away!
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();
const PORT = 8500;

server.use(helmet());
server.use(morgan('tiny'));
server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);



server.get("/api",(req,res) => {
   res.status(200).json({msg:'App is up and running now.'});
});
server.use((req,res) => {
   res.status(404).json({
      message:'No Route Found'
   })
});
server.use((err,req,res,next) => {
     console.log(err);
    res.status(500).json({       
       message: 'Something went wrong with the server'
    })
});



server.listen(PORT, (req,res) => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
})
