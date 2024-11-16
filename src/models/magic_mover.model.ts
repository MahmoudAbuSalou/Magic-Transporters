import { Document, Schema, model } from "mongoose";
import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";

// Define the MagicMover interface
export interface IMagicMover extends Document {
  weightLimit: number;
  questState: "resting" | "loading" | "on-mission";
  items: Document[]; // Assume items are references to the MagicItem model
  missionsCompleted: number;
}

// Define the MagicMover schema
const magicMoverSchema = new Schema<IMagicMover>({
  weightLimit: { type: Number, required: true },
  questState: { type: String, enum: ["resting", "loading", "on-mission"], default: "resting" },
  items: [{ type: Schema.Types.ObjectId, ref: "MagicItem" }],
  missionsCompleted: { type: Number, default: 0 },
});

addTimestamps<IMagicMover & Timestamps>(magicMoverSchema);
// Create and export the MagicMover model with the type
const MagicMover = model<IMagicMover>("MagicMover", magicMoverSchema);
export default MagicMover;
