// Code adapted from https://github.com/mrchenliang/learning-node

import mongoose from "mongoose";

const monsterSchema = new mongoose.Schema(
  {
    address: {
      street: {type: String},
      suite: {type: String},
      city: {type: String, required: true},
      zipcode: {type: String},
        geo: {
        lat: {type: String},
        lng: {type: String}
      }
    },
    id: {type: Number, required: true},
    name: {type: String, required: true},
    username: {type: String},
    email: {type: String, required: true},
    phone: {type: String},
    website: {type: String},
    company: {
      name: {type: String},
      catchPhrase: {type: String},
      bs: {type: String}
    },
    image_url: {type: String, required: true}
  },
  { timestamps: true, strictQuery: true, versionKey: false }
)

const Monster = mongoose.model("Monster", monsterSchema);

export default Monster;
