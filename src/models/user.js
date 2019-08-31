var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var User = new Schema({
  name: { type: String },
  bio: { type: String },
  email: { type: String, lowercase: true, index: true, unique: true, required: [true, "can't be blank"] },
  password: { type: String },
  type: { type: String , enum: ['member', 'peerlyst']},
  follow: {
     _author: [{ type: Schema.Types.ObjectId, ref: 'user' }],
     tags: [{ type: String }]
    },
  login_date: { type: Date, required: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('user', User);