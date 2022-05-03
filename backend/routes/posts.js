const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const path = require('path')
const multer=require('multer')
const { body, param, validationResult } = require('express-validator');
// router.use(express.static(__dirname+"./public/"));
router.use('/PostImage',express.static("public/images"));
router.use(bodyparser());
router.use(bodyparser.urlencoded({ extended: false }));
router.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.status(200).json({
        status: "success",
        posts
    });
})
var fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'./public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() +"--"+ file.originalname);
    }
});

const  upload=multer({storage:fileStorageEngine});

router.post("/posts",upload.single('PostImage'),async (req, res) => {
    console.log("dffsg")
    console.log(req.body)
    try {
        const post = await Post.create({
            name: req.body.name,
            location:req.body.location,
            likes:req.body.likes,
            description:req.body.description,
            date:req.body.date,
            PostImage:req.file.filename,
            PostImage_url: `http://localhost:5000/PostImage/${req.file.filename}`,
            user: req.user

        })
        res.status(200).json({
            status: " post created  successfully",
            data: post
        })
    }
    catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put("/posts/:id",upload.single("ePostImage") ,async (req, res) => {
    console.log(req.body)
     const updatedPost = await Post.updateMany({_id: req.params.id, user: req.user}, {PostImage_url: `http://localhost:5000/PostImage/${req.file.filename}`,name: req.body.ename,description: req.body.edescription,location: req.body.elocation,likes: req.body.elikes});
    //const updatedPost = await Post.updateMany({_id: req.params.id, user: req.user}, {$set:{PostImage_url: `http://localhost:5000/PostImage/${req.file.filename}`,name: req.body.ename,description: req.body.edescription,location: req.body.elocation,likes: req.body.elikes}});
    // const updatedPost = await Post.updateOne({ _id: req.params.id }, req.body);
    console.log(updatedPost)
    if (updatedPost.modifiedCount > 0) {
        res.status(200).json({
            status: "Post updated Successfully!",
        })
    } else {
        res.status(400).json({
            status: "User can not update this post ,Sorry!!!"
        })
    }

})

router.delete("/posts/:id", async (req, res) => {
    try {
        const deletePost = await Post.deleteOne({_id: req.params.id, user: req.user});
        console.log(deletePost)
        if (deletePost.deletedCount > 0) {
            res.status(200).json({
                status: "Post Deleted",
            })
        } else {
            res.status(400).json({
                status: "not Authorise to delete this post",
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

})

module.exports = router;