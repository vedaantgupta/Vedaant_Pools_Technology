import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Please provide a key for the setting.'],
    unique: true,
    trim: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Please provide a value for the setting.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
