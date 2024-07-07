import mongoose, { Schema, Document, Model } from "mongoose";

interface IPost extends Document {
  businessId: mongoose.Types.ObjectId; // Reference to the business
  userId: mongoose.Types.ObjectId; // Reference to the user who created the post
  content: string; // Main text content of the post
  media: string[]; // Array of URLs for media (images, videos)
  platform: "LinkedIn" | "Instagram" | "Twitter"; // Platform where the post will be published
  likes: number; // Number of likes
  comments: number; // Number of comments
  shares: number; // Number of shares
  createdAt: Date; // Date when the post was created
  scheduledAt?: Date; // Date when the post is scheduled to be published
  publishedAt?: Date; // Date when the post was published
  status: "draft" | "scheduled" | "published" | "failed"; // Status of the post
}

const PostSchema: Schema<IPost> = new Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  content: { type: String, required: true },
  media: { type: [String], default: [] },
  platform: {
    type: String,
    enum: ["LinkedIn", "Instagram", "Twitter"],
    required: true,
  },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  scheduledAt: { type: Date },
  publishedAt: { type: Date },
  status: {
    type: String,
    enum: ["draft", "scheduled", "published", "failed"],
    default: "draft",
  },
});

const Posts: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Posts;
