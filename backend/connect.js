import mongoose from "mongoose";

export async function connectmongoose(url) {
  return mongoose.connect(url);
}