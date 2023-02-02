const BlogModel = require('../models/blogs');
const { default: mongoose } = require('mongoose');


const addBlog = async (req, res) => {
    const { title, description, eventImage, author } = req.body;
    try {
        if (!title || !description || !eventImage || !author) {
            return res.status(422).json({ error: "All fields must be filled" });
        }
        else {
            const user_id = req.user._id;
            const newBlog = new BlogModel({ title, description, eventImage, author, user_id });
            const savedBlog = await newBlog.save();
            return res.status(201).json(savedBlog);
        }
    } catch (err) {
        console.log(`Error while creating blog - ${err}`);
    }
}

const getAllBlogs = async (req, res) => {
    const allBlogs = await BlogModel.find({});
    return res.status(200).json(allBlogs);
}

const getUserSpecificBlogs = async (req, res) => {
    const user_id = req.user._id;
    const userBlogs = await BlogModel.find({ user_id });
    return res.status(200).json(userBlogs);
}

const getSuggestiveBlogs = async (req, res) => {
    const suggestiveBlogs = await BlogModel.find({}).sort({ upvoteCount: -1 });
    return res.status(200).json(suggestiveBlogs)
}

const getBlogById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' });
    }
    const blog = await BlogModel.findById({ _id: id });
    if (!blog) {
        return res.status(400).json({ error: "No such blog" });
    } else {
        res.status(200).json(blog);
    }
}

const getUpvoteCount = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' });
    }
    const searchBlog = await BlogModel.find({ $and: [{ _id: id }, { usersLiked: { $elemMatch: { userInfo: user_id } } }] });
    const requiredBlog = await BlogModel.findById({ _id: id });
    if (!requiredBlog) {
        return res.status(400).json({ error: "No such blog" });
    } else {
        res.status(200).json({ requiredBlog, searchBlog });
    }
}

const updateUpvoteCount = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' });
    }
    const searchBlog = await BlogModel.find({ $and: [{ _id: id }, { usersLiked: { $elemMatch: { userInfo: _id } } }] });
    let updatedBlog;
    let currentState;
    if (searchBlog.length) {
        updatedBlog = await BlogModel.findByIdAndUpdate({ _id: id }, { $inc: { upvoteCount: -1 }, $pull: { usersLiked: { userInfo: _id } } }, { new: true });
        currentState = 'disliked';
    } else {
        updatedBlog = await BlogModel.findByIdAndUpdate({ _id: id }, { $inc: { upvoteCount: 1 }, $push: { usersLiked: { userInfo: _id } } }, { new: true });
        currentState = 'liked';
    }
    if (!updatedBlog) {
        return res.status(400).json({ error: "No such blog" });
    } else {
        res.status(200).json({ updatedBlog, currentState });
    }
}

const updateBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' });
    }
    try {
        if (!title || !description || !author) {
            return res.status(422).json({ error: "All fields must be filled" });
        }
        const updatedBlog = await BlogModel.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        const blogs = await BlogModel.find({ user_id }).sort({ createdAt: -1 });
        if (!updatedBlog) {
            return res.status(400).json({ error: "No such blog" });
        } else {
            res.status(200).json(blogs);
        }
    } catch (err) {
        res.status(400).json({ error: 'Error while updating blog' })
    }

}

const getTotalViews = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' });
    }
    try {
        const searchBlog = await BlogModel.find({ $and: [{ _id: id }, { viewers: { $elemMatch: { userInfo: user_id } } }] });
        let requiredBlog;
        if (!searchBlog.length) {
            requiredBlog = await BlogModel.findByIdAndUpdate({ _id: id }, { $inc: { totalViews: 1 }, $push: { viewers: { userInfo: user_id } } }, { new: true })
        } else {
            requiredBlog = searchBlog[0];
        }
        if (!requiredBlog) {
            return res.status(400).json({ error: "No such blog" });
        } else {
            res.status(200).json(requiredBlog);
        }
    } catch (err) {
        res.status(400).json({ error: 'Error while accessing blog' })
    }

}


const deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' });
    }
    const deletedBlog = await BlogModel.findByIdAndDelete({ _id: id });
    if (!deletedBlog) {
        return res.status(400).json({ error: "No such blog" });
    } else {
        res.status(200).json(deletedBlog);
    }
}

module.exports = { addBlog, getAllBlogs, getUserSpecificBlogs, getBlogById, getSuggestiveBlogs, deleteBlog, getUpvoteCount, getTotalViews, updateUpvoteCount, updateBlogById }
