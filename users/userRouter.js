const express = require('express');
const userDb = require('./userDb');
const router = express.Router();

router.post('/', (req, res,next) => {
    try {

    }catch(err) {
      next(err);
    }
});

router.post('/:id/posts', (req, res,next) => {
    try {

    }catch(err) {
      next(err);
    }
});

router.get('/', (req, res,next) => {
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

router.get('/:id', validateUserId, (req, res,next) => {
    try {
      res.status(200).json(req.user);
    }catch(err) {
      next(err);
    }
});

router.get('/:id/posts', (req, res,next) => {
    try {

    }catch(err) {
      next(err);
    }
});

router.delete('/:id', (req, res,next) => {
    try {

    }catch(err) {
      next(err);
    }
});

router.put('/:id', (req, res,next) => {
    try {

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
    req.post = text;
    next();
} 

module.exports = router;
