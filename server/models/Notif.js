import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


// action may be: ['STARTED_FOLLOWING', "INVITED_TO_PROJECT", "STARTED_CONTRIBUTE_TO_PROJECT"]
const schema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  fromUser: { type: mongoose.Schema.ObjectId, ref: 'User' },
  toUser: { type: mongoose.Schema.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  ref: { type: String, required: true },
  read: { type: Boolean, default: false }
});

// projectSchema.path('title').required(true, 'Project title cannot be blank');

schema.plugin(mongoosePaginate);

// Creating and exporting the user model =======================================
const Notif = mongoose.model('Notif', schema);

module.exports = Notif;
