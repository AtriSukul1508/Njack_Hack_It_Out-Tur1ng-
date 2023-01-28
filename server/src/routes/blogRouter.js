const blogRouter = require('express').Router();
const { addBlog, getAllBlogs, getUserSpecificBlogs, deleteBlog, getBlogById, getUpvoteCount, updateUpvoteCount, getSuggestiveBlogs, updateBlogById,  } = require('../controllers/blogController');
const verifyAuth = require('../middlewares/authorization');

blogRouter.use(verifyAuth);
blogRouter.post('/addblog', addBlog);
blogRouter.get('/allblogs', getAllBlogs);
blogRouter.get('/userallblog', getUserSpecificBlogs);
blogRouter.get('/getsuggestiveblog',getSuggestiveBlogs);
blogRouter.get('/blog/:id', getBlogById);
blogRouter.delete('/deleteblog/:id', deleteBlog);
blogRouter.get('/upvote/:id', getUpvoteCount);
blogRouter.post('/upvote/:id', updateUpvoteCount);
blogRouter.post('/editblog/:id',updateBlogById)

module.exports = blogRouter;