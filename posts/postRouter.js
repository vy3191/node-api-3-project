const express = require('express');
const postDb = require('./postDb');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
      res.json(await postDb.get());
    }catch(err) {
      next(err);
    }
});

router.get('/:id', validatePostId, async (req, res, next) => {
    try{      
       res.status(200).json(req.post);
    }catch(err) {
      next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{

    }catch(err) {
      next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{

    }catch(err) {
      next(err);
    }
});

// custom middleware

function validatePostId(req, res, next) {
   const {id} = req.params;
   postDb.getById(id)
         .then( post => {
           if(!post) res.status(404).json({msg:`There is post with the ID ${id}`});
           req.post = post;
           next();
         })
         .catch(err => next(err));
}

module.exports = router;
