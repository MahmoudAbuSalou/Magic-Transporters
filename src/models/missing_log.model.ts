import mongoose, { Schema, Document } from "mongoose";
import { addTimestamps, Timestamps } from "../utils/plugins/timestamp";

interface IMissionLog extends Document {
  magicMoverId: mongoose.Types.ObjectId;
  action: "loading" | "on-mission" | "unloading";
  timestamp: Date;
}

const missionLogSchema = new Schema<IMissionLog>({
  magicMoverId: { type: Schema.Types.ObjectId, ref: "MagicMover", required: true },
  action: { type: String, required: true, enum: ["loading", "on-mission", "unloading"] },
 
});
addTimestamps<IMissionLog & Timestamps>(missionLogSchema);
const MissionLog = mongoose.model<IMissionLog>("MissionLog", missionLogSchema);
export default MissionLog;
