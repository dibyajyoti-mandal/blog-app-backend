 import express from 'express';
 import { addBlog, deleteBlog, editBlog, getAllBlogs, getbyId, getbyUserId } from '../controllers/blogs-controller';

 const blogRouter = express.Router();


 blogRouter.get("/", getAllBlogs);
 blogRouter.post("/add", addBlog);
 blogRouter.put("/edit/:id", editBlog );
 blogRouter.get("/:id",getbyId);
 blogRouter.delete("/:id", deleteBlog);
 blogRouter.get("/user/:id", getbyUserId)


 export default blogRouter;