import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  id: string;
  hadding: string;
  img: string;
  play: string;
}

const movieSchema = new Schema<IMovie>({
  id: { type: String, required: true, unique: true },
  hadding: { type: String, required: true },
  img: { type: String, required: true },
  play: { type: String, required: true },
});

movieSchema.index({ hadding: 'text' });

export default mongoose.models.Movie || mongoose.model<IMovie>('Movie', movieSchema);