const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read database URI from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let mongodbUri = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/MONGODB_URI=(.*)/);
  if (match && match[1]) {
    mongodbUri = match[1].trim();
  }
} catch (err) {
  console.error('Could not read .env.local file. Ensure it exists in the workspace root.');
  process.exit(1);
}

if (!mongodbUri) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

// Product Schema mapping for seed script
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  specs: { type: Map, of: String, default: {} },
  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  {
    title: "18-inch Aluminium Vacuum Head",
    category: "Sanitation & Upkeep",
    price: 4500,
    description: "Heavy-duty aluminium vacuum head for pool bottom cleaning. Rigid structural build resists flexing and is designed for standard B2B telescopic pole attachment.",
    imageUrl: "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/rectangular-aluminium-vacuum-h-20240401164622966.jpg",
    specs: {
      "Material": "Heavy-duty Aluminium",
      "Size": "18 Inches",
      "Use": "Pool Bottom Vacuum Cleaning",
      "Compatibility": "Fits standard telescopic poles"
    },
    featured: true
  },
  {
    title: "3-Metre Telescopic Pole",
    category: "Sanitation & Upkeep",
    price: 2500,
    description: "Rigid structural reach handle. Extendable telescopic pole for deep pool maintenance. Smooth lock-slide mechanism lets users connect vacuum heads, net skimmers, or brushes.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/SL/GE/LW/18908955/3m-swimming-pool-telescopic-pole-500x500.jpg",
    specs: {
      "Extended Length": "3 Metres",
      "Design": "Telescopic extendable",
      "Reach": "Deep Water",
      "Material": "Anodized Aluminium"
    },
    featured: true
  },
  {
    title: "Professional Cleaning Brush",
    category: "Sanitation & Upkeep",
    price: 2000,
    description: "Curved pool wall scrub bristle brush. High-density nylon bristles designed to scrub out algae and scale lines on concrete, vinyl, or tiled pool surfaces.",
    imageUrl: "https://m.media-amazon.com/images/I/51azbonYrtS.jpg",
    specs: {
      "Type": "Curved Scrub Brush",
      "Bristles": "High-density Nylon",
      "Application": "Wall & Floor algae removal",
      "Handle Fitting": "Fits standard clip poles"
    },
    featured: false
  },
  {
    title: "Deep Leaf Net Skimmer",
    category: "Sanitation & Upkeep",
    price: 1450,
    description: "Reinforced deep mesh net bag with a rigid plastic structural frame. Designed to skim large leaf volume and floating organic debris from pool water surfaces without tearing.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/LV/FH/IA/185944329/plastic-blue-deep-net-bag-1000x1000.JPG",
    specs: {
      "Frame": "Rigid structural ABS",
      "Net style": "Deep mesh bag",
      "Design": "Anti-Snag beveled front edge"
    },
    featured: false
  },
  {
    title: "White ABS Eyeball Nozzle",
    category: "Plumbing & Controls",
    price: 2500,
    description: "Single-hole directional return wall jet nozzle. Controls the flow of purified water recirculating back into the pool basin from the filtration plant.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/KU/WK/QZ/185944329/swimming-pool-nozzle-1000x1000.jpeg",
    specs: {
      "Material": "White ABS Thermoplastic",
      "Connection": "Standard threaded return wall jet",
      "Aperture": "Adjustable directional eyeball nozzle"
    },
    featured: false
  },
  {
    title: "Heavy Duty PVC Pool Skimmer",
    category: "Plumbing & Controls",
    price: 2500,
    description: "Heavy duty structural surface skimmer. Recessed wall-mount skimmer catches floating leaves, insects, and oils before they sink, preserving filtration efficiency.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/VC/BJ/PD/18908955/pvc-swimming-pool-skimmer-250x250.jpg",
    specs: {
      "Material": "Reinforced PVC",
      "Type": "Recessed Wall Mount Skimmer",
      "Access": "Removable basket cover"
    },
    featured: true
  },
  {
    title: "20W LED Underwater Pool Light",
    category: "Atmospheric Lighting",
    price: 4500,
    description: "Waterproof underwater LED illumination array. IP68 certified submersible spot lighting for night visibility, ambient design, and safety.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/JH/NY/TM/18908955/20w-swimming-pool-led-light-500x500.jpg",
    specs: {
      "Power consumption": "20 Watts",
      "Bulb Type": "Submersible LED array",
      "Waterproof rating": "IP68 Certified",
      "Input Voltage": "12V AC (Transformer required)"
    },
    featured: true
  },
  {
    title: "20W LED Fountain Light",
    category: "Atmospheric Lighting",
    price: 4500,
    description: "Submersible focal spot lighting for cascades, waterfalls, and water fountains. High-luminescence RGB projection style.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/GJ/YY/TV/18908955/20w-led-fountain-light-500x500.jpg",
    specs: {
      "Power": "20 Watts",
      "Type": "Submersible spot LED",
      "Application": "Waterpark & Fountain lighting",
      "Housing": "Rust-proof sealing"
    },
    featured: false
  },
  {
    title: "Stainless Steel Fountain Nozzle",
    category: "Structural Accents",
    price: 1200,
    description: "Rust-proof high-pressure water jet spout. Creates premium frothy water geysers and patterns in landscaping pools, gardens, or commercial ponds.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/BO/YO/YQ/18908955/stainless-steel-fountain-nozzle-250x250.jpg",
    specs: {
      "Material": "Stainless Steel",
      "Grade": "Rust-proof grade",
      "Spout pattern": "High pressure column jet"
    },
    featured: false
  },
  {
    title: "6kW Heavy Steam Bath Generator",
    category: "Spa & Wellness",
    price: 35000,
    description: "Automated residential/commercial spa boiler. Generates consistent steam outputs for custom saunas, steam rooms, or personal jacuzzis.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/CB/TB/EO/18908955/6kw-steam-bath-generator-250x250.jpg",
    specs: {
      "Power output": "6 kW",
      "Type": "Steam Boiler Generator",
      "Controller": "External digital control panel",
      "Application": "Home saunas & commercial spa suites"
    },
    featured: true
  }
];

async function seedDatabase() {
  console.log('Connecting to database:', mongodbUri);
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected! Purging existing products in catalog...');
    
    await Product.deleteMany({});
    console.log('Purged! Inserting initial catalog items...');
    
    await Product.insertMany(productsData);
    console.log('Successfully seeded database with 10 B2B catalog products!');
    
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  }
}

seedDatabase();
