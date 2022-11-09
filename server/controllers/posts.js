import PostMessage from "../models/postMessage.js";

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with such id");

  const updatePost = PostMessage.findByIdAndUpdate(id, post, { new: true });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with such id: ${id}`);
  await PostMessage.findByIdAndRemove(id);
};

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const newPost = new PostMessage(body);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
