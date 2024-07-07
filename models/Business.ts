import mongoose, { Document, Model, Schema } from "mongoose";
import toJSON from "./plugins/toJSON";

interface IBusiness extends Document {
  businessName: string;
  businessDescription: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  tagline: string;
  referral?: string;
  owner: mongoose.Types.ObjectId;
  industry?: string;
  logo: string;
  brandColor: string;
  secondaryColor: string;
  accentColor: string;
}

const BusinessSchema: Schema<IBusiness> = new Schema({
  businessName: { type: String, required: true },
  businessDescription: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  website: { type: String },
  tagline: { type: String },
  referral: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  industry: { type: String },
  logo: { type: String, required: true },
  brandColor: { type: String },
  secondaryColor: { type: String },
  accentColor: { type: String },
});

BusinessSchema.plugin(toJSON);

const Business: Model<IBusiness> =
  mongoose.models.Business ||
  mongoose.model<IBusiness>("Business", BusinessSchema);

export default Business;
