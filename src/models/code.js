import mongoose from "mongoose";

const NewCodeSchema = new mongoose.Schema(
  {
   
    code: String,
    priceDrop: Number,
   
  },
  { timestamps: true }
);

const Code =
  mongoose.models.Codes || mongoose.model("Codes", NewCodeSchema);

export default Code;