import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  context: {
    project: { type: mongoose.Schema.ObjectId, ref: 'Project' },
    community: { type: String }
  },
  content: {
    type: String,
    required: true
  },
  editedOn: { type: Date, default: null },
  tags: Array,
  hearts: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  thumbUps: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }]
});

// projectSchema.path('title').required(true, 'Project title cannot be blank');


// Creating and exporting the user model =======================================
const Post = mongoose.model('Post', projectSchema);

module.exports = Post;
