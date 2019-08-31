let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let TagSchema = new Schema({
    name: { type: String(), required: true },
    date: { type: Date, default: Date.now },
    description: { type: String() },
    _author: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('tags', TagSchema);