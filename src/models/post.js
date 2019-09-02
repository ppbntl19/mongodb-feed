let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Post = Schema({
  title: { type: String },
  body: { type: String },
  tags: [{ type: String }],
  category: { type: String , enum: ['A', 'B', 'C']},//Type A and B is peerlyst post and C is member post
  created_by: {
    name: { type: String },
    type: { type: String }
  },
  _author: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('post', Post);