import mongoose, { Document, Schema, Model } from "mongoose";

interface IProfile extends Document {
  business: mongoose.Types.ObjectId;
  xAccount?: string;
  instagramAccount?: string;
  linkedinAccount?: string;
  facebookAccount?: string;
  tiktokAccount?: string;
  pinterestAccount?: string;
  socialHandle?: string;
  postingSchedule?: string;
  // Add more fields as needed
}

const ProfileSchema: Schema<IProfile> = new Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  xAccount: { type: String },
  instagramAccount: { type: String },
  linkedinAccount: { type: String },
  facebookAccount: { type: String },
  tiktokAccount: { type: String },
  pinterestAccount: { type: String },
  socialHandle: { type: String },
  postingSchedule: { type: String },
  // Add more fields as needed
});

const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
