import postModel from "../models/postModel.js";

const postController = {
  /**
   * This function creates a new request post in the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns The newly created request post
   */
  async createPost(req, res) {
    const data = req.body;
    try {
      if (!data) {
        return res.status(400).json({ message: "Request data not found" });
      }
      const post = await postModel.createPost(data);
      res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * This function retrieves a post with the specified ID
   * @param {*} req - The request object
   * @param {*} res - The response object
   * @returns The post with the specified ID
   */
  async getPostById(req, res) {
    const postId = req.params.id;
    try {
      const post = await postModel.getPostById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res
        .status(200)
        .json({ message: "Successfully retrieved post", post: post });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Can't get post", error: error.message });
    }
  },

  /**
   * This function retrieves all the posts in the database
   * @param {*} req - The request object
   * @param {*} res - The response object
   * @returns All the posts in the database (active and inactive)
   */
  async getAllPosts(req, res) {
    try {
      const posts = await postModel.getAllPosts();
      return res
        .status(200)
        .json({ message: "Successfully retrieved all posts", posts });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Can't get posts", error: error.message });
    }
  },

  /**
   * This function updates a post with the specified ID
   * @param {*} req - The request object
   * @param {*} res - The response object
   * @returns The updated post
   */
  async updatePost(req, res) {
    const data = req.body;
    const postId = req.params.id;
    try {
      if (!data) {
        return res.status(400).json({ message: "Request data not found" });
      }
      const post = await postModel.updatePost(postId, data);
      res
        .status(201)
        .json({ message: "Post updated successfully", post: post });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Can't update post", error: error.message });
    }
  },

  /**
   * This function deletes a post with the specified ID
   * @param {*} req - The request object
   * @param {*} res - The response object
   * @returns The deleted post
   */
  async deletePost(req, res) {
    const postId = req.params.id;
    try {
      const post = await postModel.deletePost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res
        .status(200)
        .json({ message: "Successfully deleted post", post: post });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Can't delete post", error: error.message });
    }
  },
};

export default postController;
