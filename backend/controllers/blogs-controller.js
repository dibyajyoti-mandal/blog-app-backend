import { response } from "express";
import Blog from "../model/Blog";
import User from "../model/User";
import mongoose from "mongoose";


export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    res.status(404).json({ message: "Blogs not found" });
  }
  return res.status(200).json({ blogs })
}

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);

  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "invalid user" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user
  });
  try {
    // await blog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err })
  }
  return res.status(200).json({ blog });

}

export const editBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Update The Blog" });
  }
  return res.status(200).json({ blog });
};

export const getbyId = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ blog });
}

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();

  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Not found" });
  }
  return res.status(200).json({ blog, message: "deleted" });
}

export const getbyUserId = async(req,res,next)=>{
  const userId = req.params.id;
  let userBlogs;
  try{
    userBlogs = await User.findById(userId).populate("blogs");
  }catch(err){
    return console.log(err);
  }
  if(!userBlogs){
    return res.status(404).json({message:"Blogs not found"});
  }
  return res.status(200).json({blogs:userBlogs})
}