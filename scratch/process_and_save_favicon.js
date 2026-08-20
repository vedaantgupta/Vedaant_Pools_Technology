import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://vedaant:A%40a12345@cluster1.gqatres.mongodb.net/vedaant_pools?retryWrites=true&w=majority&appName=Cluster1";

const SettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);

async function run() {
  console.log('--- Processing Favicon & Logo ---');
  
  const srcFile = path.resolve('example/Gemini_Generated_Image_ved9taved9taved9.png');
  if (!fs.existsSync(srcFile)) {
    console.error('Source image not found at:', srcFile);
    process.exit(1);
  }

  const imageBuffer = fs.readFileSync(srcFile);
  const base64DataUri = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  // Copy high-res image to public and app
  const publicDir = path.resolve('public');
  const appDir = path.resolve('src/app');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

  fs.copyFileSync(srcFile, path.join(publicDir, 'logo.png'));
  fs.copyFileSync(srcFile, path.join(publicDir, 'icon.png'));
  fs.copyFileSync(srcFile, path.join(publicDir, 'favicon.png'));
  fs.copyFileSync(srcFile, path.join(publicDir, 'apple-touch-icon.png'));
  fs.copyFileSync(srcFile, path.join(publicDir, 'android-chrome-192x192.png'));
  fs.copyFileSync(srcFile, path.join(publicDir, 'android-chrome-512x512.png'));
  fs.copyFileSync(srcFile, path.join(publicDir, 'favicon.ico'));

  fs.copyFileSync(srcFile, path.join(appDir, 'icon.png'));
  fs.copyFileSync(srcFile, path.join(appDir, 'apple-icon.png'));
  fs.copyFileSync(srcFile, path.join(appDir, 'favicon.ico'));

  console.log('Copied all image files to public/ and src/app/ successfully.');

  // Connect to MongoDB and save settings
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB!');

    // 1. Save site_favicon
    await Setting.findOneAndUpdate(
      { key: 'site_favicon' },
      { 
        key: 'site_favicon',
        value: {
          url: '/favicon.ico',
          pngUrl: '/icon.png',
          base64: base64DataUri,
          updatedAt: new Date().toISOString()
        }
      },
      { upsert: true, new: true }
    );
    console.log('Saved setting: site_favicon (including base64 data URI)');

    // 2. Save site_logo
    await Setting.findOneAndUpdate(
      { key: 'site_logo' },
      { 
        key: 'site_logo',
        value: {
          url: '/logo.png',
          base64: base64DataUri,
          updatedAt: new Date().toISOString()
        }
      },
      { upsert: true, new: true }
    );
    console.log('Saved setting: site_logo');

    // 3. Update site_branding with logoImageUrl: '/logo.png'
    const existingBranding = await Setting.findOne({ key: 'site_branding' });
    const currentBrandingVal = existingBranding ? existingBranding.value : {};

    await Setting.findOneAndUpdate(
      { key: 'site_branding' },
      {
        key: 'site_branding',
        value: {
          ...currentBrandingVal,
          logoImageUrl: '/logo.png',
          logoBase64: base64DataUri
        }
      },
      { upsert: true, new: true }
    );
    console.log('Updated setting: site_branding with logoImageUrl: /logo.png');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB. All done!');
  } catch (err) {
    console.error('Error saving to MongoDB:', err);
  }
}

run();
