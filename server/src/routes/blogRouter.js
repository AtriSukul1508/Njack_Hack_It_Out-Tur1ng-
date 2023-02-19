const blogRouter = require('express').Router();
const { addBlog, getAllBlogs, getUserSpecificBlogs, deleteBlog, getBlogById, getUpvoteCount, updateUpvoteCount, getSuggestiveBlogs, updateBlogById, getTotalViews } = require('../controllers/blogController');
const verifyAuth = require('../middlewares/authorization');

blogRouter.get('/hello',async (req,res)=>{
    res.send("Hello")
})
blogRouter.get('/allblogs', getAllBlogs);
blogRouter.post('/addblog', addBlog);
blogRouter.get('/userallblog', getUserSpecificBlogs);
blogRouter.get('/getsuggestiveblog', getSuggestiveBlogs);
// blogRouter.use(verifyAuth);
blogRouter.get('/blog/:id', getBlogById);
blogRouter.delete('/deleteblog/:id', deleteBlog);
blogRouter.get('/upvote/:id', getUpvoteCount);
blogRouter.post('/upvote/:id', updateUpvoteCount);
blogRouter.post('/editblog/:id', updateBlogById);
blogRouter.post('/views/:id', getTotalViews);

module.exports = blogRouter;