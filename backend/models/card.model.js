import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  interests: {
    type: [String],
  },
  socialMedias: {
    type: [{ name: String, url: String }],
  },
});

const Card = mongoose.model("card", cardSchema);

export default Card;
