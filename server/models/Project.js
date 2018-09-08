import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');

const projectSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  creator: {
    about: { type: String, default: '' },
    mission: { type: String, default: '' }
  },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: String,
  communities: Array,
  interestAreas: Array,
  contributors: Object,
  submission: {
    platform: { type: String, required: true },
    instruction: { type: String, default: '' }
  },
  dueDate: Date
});

// projectSchema.path('title').required(true, 'Project title cannot be blank');

// Model methods ===============================================================
projectSchema.methods.list = function (options) {
  const criteria = options.criteria || {};
  const page = options.page || 0;
  const limit = options.limit || 30;
  return this.find(criteria)
    .populate('user', 'name username')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * page)
    .exec();
};

// Creating and exporting the user model =======================================
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
