import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String },
  avatar: { type: String },
  description: { type: String },
  categoryId: { type: String },

  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
},{
    timestamps: true,
});

const Article = mongoose.model("Article", articleSchema , "articles");

export default Article;
