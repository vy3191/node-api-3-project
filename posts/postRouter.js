const express = require('express');
const postDb = require('./postDb');
const router = express.Router({mergeParams:true});

router.get('/', async (req, res, next) => {
                try{
                  res.json(await postDb.get());
                }catch(err) {
                  next(err);
                }
});

router.get('/:postId', 
             validatePostId,
             async (req, res, next) => {
              try{            
                res.status(200).json(req.post);
              }catch(err) {
                next(err);
              }
});

router.delete('/:postId',
                 validatePostId,
                 async (req, res, next) => {
                try{
                  const count = await postDb.remove(req.params.postId);
                  console.log('retrun from del',count);
                  if(count > 0) res.status(204).end();
                }catch(err) {
                  next(err);
                }
});

router.put('/:postId',
            validatePostId, 
            validatePost, 
            async (req, res, next) => {
            try{     
              console.log('postId', req.params.postId);
              console.log('id', req.params.id);
              const count = await postDb.update(req.params.postId, {text:req.post, user_id: req.params.id});
              if(count > 0) res.status(200).json(await postDb.getById(req.params.postId));
            }catch(err) {
              next(err);
            }
});

// custom middleware

function validatePostId(req, res, next) {
   const id = req.params.postId;
   postDb.getById(id)
         .then( post => {
           if(!post) res.status(404).json({msg:`There is post with the ID ${id}`});
           req.post = post;
           next();
         })
         .catch(err => next(err));
}

function validatePost(req, res, next) {
  if(!req.body) res.status(400).json({ message: "missing post data" });
  if(!req.body.text)  res.status(400).json({ message: "missing required text field" });
  req.post = req.body.text;
  next();
} 

module.exports = router;
