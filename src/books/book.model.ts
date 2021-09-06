import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

export interface Book extends mongoose.Document{
  id: string;
  title: string;
  description: string;
}
