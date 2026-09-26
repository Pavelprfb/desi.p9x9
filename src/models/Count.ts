import mongoose, { Document, Schema } from 'mongoose';

export interface ICount extends Document {
  random: number;
  count: number;
}

const countSchema = new Schema<ICount>({
  random: { type: Number, default: 1 },
  count: { type: Number, default: 0 },
});

export default mongoose.models.CountModel || mongoose.model<ICount>('CountModel', countSchema);