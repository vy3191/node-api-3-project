const express = require('express');
const userDb = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
    req.text = text;
    next();
} 

module.exports = router;
