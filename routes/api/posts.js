const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require("../../middleware/authenticate");
const Post = require("../../models/Post");
const postValidator = require('../../validation/posts');
const Profile = require('../../models/Profile');

// @route /api/post/test
// @desc testing routes
// @status Public route
router.get('/test', (req, res) => {
    res.json({
        message: "posts route is working"
    })
})


// @route /api/post
// @desc creating posts
// @status private route
router.post('/',authenticate,(req,res) => {
    
const {errors,isValid} = postValidator(req.body);

if (isValid) {
    return res.status(400).json(errors);
}


    var newPost = new Post({
        user:req.user._id,
        name:req.body.name,
        text:req.body.text,
        avatar:req.body.avatar
    })

    newPost.save().then(post => res.json(post))

})


// @route /api/post
// @desc getting all posts
// @status Public route
router.get('/',(req,res) => {
    Post.find().sort({date: -1}).then(post => res.json(post)).catch(e => res.status(404).json(e))
})

// @route /api/post/:id
// @desc finding posts by id
// @status public route
router.get('/:id',(req,res) => {
    
    Post.findById(req.params.id).then(post => {
        if(!post){
            return res.status(404).json({nopost:"no post found with that id"})
        }
        res.json(post)
    }).catch(e => res.status(404).json({nopost:"Something went wrong"}))
})

// @route /api/post/:id
// @desc deleting posts by id
// @status private route
router.delete('/:id',authenticate,(req,res) => {
    
    Post.findOne({user:req.user.id,_id:req.params.id}).then(post => {
        if(!post){
           return res.status(404).json({error:"You are not authorized please login again"})
        }

        Post.findByIdAndDelete(req.params.id).then(() => res.json({success:"deleted successfully"})).catch(e => res.status(404).json(e))
    }).catch(e => res.status(404).json(e))
})


// @route /api/post/like/:id
// @desc Liking posts by id
// @status private route
router.post('/like/:id',authenticate,(req,res) => {
    
    Profile.findOne({user:req.user.id}).then(profile => {
        
        
        Post.findById(req.params.id).then(post => {
         
            if(post.likes.filter(likes => likes.user.toString() == req.user.id).length > 0){
                return res.status(400).json({message:"User already liked"});
            }

            post.likes.unshift({user:req.user.id});

            post.save().then(likes => res.json(likes)).catch(e => res.status(404).json(e));

        }).catch(e => res.status(404).json(e))
    })

    
})
 

// @route /api/post/unlike/:id
// @desc unLiking posts by id
// @status private route
router.post('/unlike/:id',authenticate,(req,res) => {
    
    Profile.findOne({user:req.user.id}).then(profile => {
        
        
        Post.findById(req.params.id).then(post => {
         
            if(post.likes.filter(likes => likes.user.toString() == req.user.id).length == 0){
                return   res.status(400).json({message:"User didnt like this post"});
              
            }

            var removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
                console.log(removeIndex)
                if(removeIndex == -1) removeIndex = null;
                if(removeIndex != null){
                post.likes.splice(removeIndex,1);
                return post.save().then(likes => res.json(likes)).catch(e => res.status(404).json(e));
                }
                post.save().then(likes => res.json(likes)).catch(e => res.status(404).json(e));

    }).catch(e => res.status(400).json(e))
    
})
}
)

// @route /api/post/comment/:id
// @desc Commenting on posts by id
// @status private route
router.post('/comment/:id',authenticate,(req,res) => {
      
        const {errors,isValid} = postValidator(req.body);

        if (isValid) {
            return res.status(400).json(errors);
        }
        
        Post.findById(req.params.id).then(post => { 

            var Comment = {
                text:req.body.text,
                user:req.user.id,
                name:req.user.name,
                avatar:req.user.avatar,
            }

            post.comments.unshift(Comment);
            post.save().then(post => res.json(post)).catch(e => res.status(404).json(e))
            
            
        }).catch(e => res.status(404).json(e))


    
})

// @route /api/post/comment/:id/:comment
// @desc Deleting comments
// @status private route
router.delete('/comment/:id/:comment',authenticate,(req,res) => {
    
    Post.findById(req.params.id).then(post => { 

        if(post.comments.filter(filter => filter._id.toString() == req.params.comment).length == 0)
        {
            return res.status(404).json({commentnotfound:"User comment not found"})
        }

        post.comments.map(item => {
            if(item._id == req.params.comment){
                if(item.user != req.user.id){
                    return res.status(404).json({commentnotfound:"User is unauthorized"})
                }
                var removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment);
                console.log(removeIndex)
                if(removeIndex == -1) removeIndex = null;
                if(removeIndex != null){
                post.comments.splice(removeIndex,1);
                return post.save().then(likes => res.json(likes)).catch(e => res.status(404).json(e));
                }
                post.save().then(post => res.json(post)).catch(e => res.status(404).json(e))
            }
        })

        
       
        
        
    }).catch(e => res.status(404).json(e))



})

module.exports = router;