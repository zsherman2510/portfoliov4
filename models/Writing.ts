import mongoose, { Document, Schema, Model } from "mongoose";

interface IWriting extends Document {
  business: mongoose.Types.ObjectId;
  writingStyle: string;
  contentTopics: string[];
  marketPosition?: string;
  notableInformation?: string;
  overview?: string;
  services?: any;
  targetAudience?: string;
  uniqueSellingProposition?: any;
}

const WritingSchema: Schema<IWriting> = new Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  writingStyle: { type: String, required: true },
  contentTopics: { type: [String], default: [] },
  marketPosition: { type: String },
  notableInformation: { type: String },
  overview: { type: String },
  services: { type: [String], default: [] },
  targetAudience: { type: String },
  uniqueSellingProposition: { type: [String] },
});

const Writing: Model<IWriting> =
  mongoose.models.Writing || mongoose.model<IWriting>("Writing", WritingSchema);

export default Writing;
