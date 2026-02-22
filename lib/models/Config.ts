import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
  logo: { type: String, default: '/logo.svg' },
  siteName: { type: String, default: 'ADUST Wudil Connect' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Config || mongoose.model('Config', ConfigSchema);
