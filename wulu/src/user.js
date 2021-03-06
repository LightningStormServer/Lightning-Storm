import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true, unique: true },
  money: { type: Number, default: 0 },
  symbol: String
});

export default mongoose.model('user', userSchema);
