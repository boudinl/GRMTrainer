import mongoose from "mongoose";

const NewOpinionSchema = new mongoose.Schema(
  {
   
    description: String,
    signature: String,
   
  },
  { timestamps: true }
);

const Opinion =
  mongoose.models.Opinions || mongoose.model("Opinions", NewOpinionSchema);

export default Opinion;