import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  avatar: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: String, required: true },
 
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
},{
    timestamps: true,
});

const Article = mongoose.model("Article", articleSchema , "articles");

export default Article;
