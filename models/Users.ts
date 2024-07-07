import mongoose, { Document, Model, Schema } from "mongoose";
import toJSON from "./plugins/toJSON";

// USER SCHEMA
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
    customerId: {
      type: String,
      validate(value: string) {
        return value.includes("cus_");
      },
    },
    priceId: {
      type: String,
      validate(value: string) {
        return value.includes("price_");
      },
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    businesses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Business",
      },
    ],
    postsPerDay: {
      type: Number,
      default: 0,
    },
    generatedPostsPerMonth: {
      type: Number,
      default: 0,
    },
    instagramAccount: {
      type: String,
    },
    instagramToken: {
      type: String,
    },
    linkedinAccount: {
      type: String,
    },
    linkedinToken: {
      type: String,
    },
    facebookAccount: {
      type: String,
    },
    facebookToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  customerId: string;
  priceId: string;
  hasAccess: boolean;
  isAdmin: boolean;
  businesses: mongoose.Types.ObjectId[];
  postsPerDay: number;
  generatedPostsPerMonth: number;
  instagramAccount: string;
  instagramToken: string;
  linkedinAccount: string;
  linkedinToken: string;
  facebookAccount: string;
  facebookToken: string;
}

const User: Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);

export default User;
