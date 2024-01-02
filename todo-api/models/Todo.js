import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "task is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Todo', todoSchema);;
