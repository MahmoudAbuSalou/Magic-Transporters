import mongoose, { Schema, Document } from "mongoose";
import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";


export interface IMagicItem extends Document {
  name: string;
  weight: number;
}


const magicItemSchema = new Schema<IMagicItem>({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
});
addTimestamps<IMagicItem & Timestamps>(magicItemSchema);

const MagicItem = mongoose.model<IMagicItem>("MagicItem", magicItemSchema);
export default MagicItem;
