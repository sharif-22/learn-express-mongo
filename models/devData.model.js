import mongoose from "mongoose";

const DevDataSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, "Developer name is requried"],
    },
    education: {
      type: String,
      requried: [true, "Education details is requried"],
    },
    currentSalary: {
      type: Number,
      requried: [true, "Please enter your current salary"],
    },
    expectedSalary: {
      type: Number,
      requried: [true, "Please enter your expected salary"],
    },
    skills: {
      type: [String], // Array of strings for skills
      required: [true, "At least one skill is required"],
    },
  },
  {
    timeStamp: true,
  }
);

const DevData = mongoose.model("DevData", DevDataSchema);

export default DevData;
