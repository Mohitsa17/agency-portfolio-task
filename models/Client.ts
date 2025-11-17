import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  designation: string;
  description: string;
  image: string;
  createdAt: Date;
}

const ClientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const Client = mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

export default Client;

