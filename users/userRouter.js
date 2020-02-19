const express = require('express');
const userDb = require('./userDb');
const postDb = require("../posts/postDb");
const postRouter = require('../posts/postRouter');
const router = express.Router({mergeParams:true});

router.use("/:id/posts", postRouter);

router.post('/',validateUser, async (req, res,next) => {
    try {
      res.status(201).json(await userDb.insert({name:req.name}))
    }catch(err) {
      next(err);
    }
});

router.post('/:id/posts',
             validateUserId,
             validatePost, 
             async (req, res,next) => {
              try {
                const id = req.params.id;
                const body = { user_id:id, text:req.post};
                const results = await postDb.insert(body);
                 res.status(201).json(results);
              }catch(err) {
                next(err);
              }
});

router.get('/',
          (req, res,next) => {
          try {
            userDb.get()
                  .then(users => {
                    if(!users) res.status(404).json({msg:'Users not found'});
                    res.json(users);
                  })
          }catch(err) {
            next(err);
          }
});

router.get('/:id', 
           validateUserId, 
           (req, res,next) => {
            try {
              res.status(200).json(req.user);
            }catch(err) {
              next(err);
            }
});

router.get('/:id/posts',
             validateUserId, 
            (req, res,next) => {
            try {
              const posts = userDb.getUserPosts(req.params.id);
              console.log(posts);
              res.status(200).json(posts);
            }catch(err) {
              next(err);
            }
});

router.delete('/:id',
               validateUserId, 
               async (req, res,next) => {
                try {
                  const count = await userDb.remove(req.params.id);
                  if(count > 0) res.status(204).end();
                }catch(err) {
                  next(err);
                }
});

router.put('/:id',
            validateUserId,
            validateUser,
            async (req, res,next) => {
            try {
              const newUserCount = await userDb.update(req.params.id, {name:req.name})
              if(newUserCount > 0) res.status(200).json(await userDb.getById(req.params.id));
            }catch(err) {
              next(err);
            }
});

//custom middleware

function validateUserId(req, res, next) {  
      const {id} = req.params;
      userDb.getById(id)
            .then( user => {
               if(!user) res.status(404).json({ message: "invalid user id" });
               req.user = user;
               next();
            })
            .catch(err => next(err));  
}

function validateUser(req, res, next) {
     const { name } = req.body;
     if(!req.body) res.status(400).json({ message: "missing user data" });
     if(!name) res.status(400).json({ message: "missing required name field" });
     req.name = name;
     next();
}

function validatePost(req, res, next) {
    if(!req.body) res.status(400).json({ message: "missing post data" });
    if(!req.body.text)  res.status(400).json({ message: "missing required text field" });
    req.post = req.body.text;
    next();
} 

module.exports = router;
