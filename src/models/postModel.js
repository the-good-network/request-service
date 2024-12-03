import supabase from "../config/db.js";

/**
 * This module contains functions for interacting with the posts table in the database
 */
const postModel = {
  /**
   * This function creates a new request post in the database
   * @param {Object} data - The request post data
   * @returns The newly created request post
   */
  async createPost(postData) {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ ...postData }])
      .select("*");

    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  },

  /**
   * This function retrieves a post with the specified ID
   * @param {*} postId The ID of the post to retrieve
   * @returns The post with the specified ID
   */
  async getPostById(postId) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId);

    if (error) {
      throw new Error(error.message);
    }
    return data[0]; // Return the first and only post in the array
  },

  /**
   * This function retrieves all the posts in the database
   * @returns All the posts in the database (active and inactive)
   */
  async getAllPosts() {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /**
   * This function updates a post with the specified ID
   * @param {*} postId The ID of the post to update
   * @param {*} updatedData The updated data for the post
   * @returns The updated post
   */
  async updatePost(postId, updatedData) {
    const { data, error } = await supabase
      .from("posts")
      .update(updatedData)
      .eq("id", postId)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  },

  /**
   * This function deletes a post with the specified ID
   * @param {*} postId The ID of the post to delete
   * @returns The deleted post
   */
  async deletePost(postId) {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  },

  /**
   * This function retrieves the user ID of the post owner
   * @param {*} postId The ID of the post
   * @returns The user ID of the post owner
   */
  async getPostUserId(postId) {
    const { data, error } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", postId);

    if (error) {
      throw new Error(error.message);
    }

    return data[0].user_id;
  },
};

export default postModel;
