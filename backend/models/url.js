import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  redirectUrl: { type: String, required: true },
  visitHistory: [
    {
      timestamp: { type: Number },
    },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);
export default Url;

