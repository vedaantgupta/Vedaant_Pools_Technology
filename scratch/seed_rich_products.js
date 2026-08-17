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
  console.error('Could not read .env.local file.');
  process.exit(1);
}

if (!mongodbUri) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, default: 'India' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  brand: { type: String, default: 'Vedaant Pools Pro Series' },
  description: { type: String },
  highlights: { type: [String], default: [] },
  price: { type: Number },
  mrp: { type: Number },
  specs: { type: Map, of: String, default: {} },
  imageUrl: { type: String, required: true },
  images: { type: [String], default: [] },
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 4.8 },
  numReviews: { type: Number, default: 0 },
  reviews: [ReviewSchema],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  {
    title: "18-inch Aluminium Vacuum Head",
    category: "Sanitation & Upkeep",
    brand: "VPT Pro HydroClean",
    price: 4500,
    mrp: 5800,
    description: "Heavy-duty 18-inch die-cast aluminium vacuum head engineered for swimming pool floor and wall suction cleaning. Rigid structural spine prevents flexing under high-flow pumps.",
    imageUrl: "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/rectangular-aluminium-vacuum-h-20240401164622966.jpg",
    images: [
      "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/rectangular-aluminium-vacuum-h-20240401164622966.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2023/10/354770853/YV/QG/ZB/18908955/swimming-pool-cleaning-brush-500x500.jpg",
      "https://m.media-amazon.com/images/I/71o8c2Y+GSL._AC_SL1500_.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/8/SL/GE/LW/18908955/3m-swimming-pool-telescopic-pole-500x500.jpg"
    ],
    highlights: [
      "Heavy-duty 18-inch cast aluminium structural body designed for intensive commercial pool sweeping.",
      "Flexible nylon perimeter bristles effortlessly remove algae and stubborn scale lines without tile scratching.",
      "Universal spring-loaded snap handle fits standard 1.25\" and 1.5\" telescopic poles.",
      "High-efficiency suction chamber compatible with 1.5\" vacuum hoses for rapid sediment evacuation."
    ],
    specs: {
      "Material": "Heavy-duty Die-Cast Aluminium",
      "Width / Length": "18 Inches (457 mm)",
      "Operation Mode": "Manual Suction with Telescopic Pole",
      "Usage / Application": "Concrete, Tiled & Mosaic Pool Bottoms",
      "Hose Connection": "Standard 1.5 Inch Swivel Cuff",
      "Bristle Type": "Wear-Resistant Polypropylene"
    },
    featured: true,
    rating: 4.9,
    numReviews: 24,
    reviews: [
      {
        name: "Arun Verma",
        city: "Indore, MP",
        rating: 5,
        title: "Best vacuum head for our resort pool!",
        comment: "The heavy aluminium build keeps it grounded on the floor without floating up. Cleaning our 25-meter pool takes half the time now. Highly recommended.",
        verified: true,
        createdAt: new Date("2026-06-12")
      },
      {
        name: "Sunil Rathore",
        city: "Bhopal, MP",
        rating: 5,
        title: "Solid construction, zero flexing",
        comment: "Much sturdier than plastic vacuum heads that crack after 2 seasons. Handles commercial pump suction with ease.",
        verified: true,
        createdAt: new Date("2026-07-04")
      },
      {
        name: "Vikram Kothari",
        city: "Jaipur, Rajasthan",
        rating: 4,
        title: "Great product and fast delivery",
        comment: "Fit perfectly onto our 3m pole. Dispatch took just 2 days. Quality is top grade.",
        verified: true,
        createdAt: new Date("2026-07-28")
      }
    ]
  },
  {
    title: "3-Metre Telescopic Pole",
    category: "Sanitation & Upkeep",
    brand: "VPT Pro Reach",
    price: 2500,
    mrp: 3200,
    description: "Heavy-gauge anodized aluminium extendable pole with dual cam-lock collars. Allows effortless reaching and maneuvering of vacuum heads, deep leaf rakes, and brushes.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/SL/GE/LW/18908955/3m-swimming-pool-telescopic-pole-500x500.jpg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/8/SL/GE/LW/18908955/3m-swimming-pool-telescopic-pole-500x500.jpg",
      "https://m.media-amazon.com/images/I/61bKk3p36UL._AC_SL1500_.jpg",
      "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/Catalogue/rectangular-aluminium-vacuum-h-20240401164622966.jpg"
    ],
    highlights: [
      "Dual internal cam-lock mechanism prevents slippage under wet, heavy load handling.",
      "Commercial anodized aluminium tubing resists pool chemicals, UV bleaching, and oxidation.",
      "Ergonomic rubberized grip provides non-slip control during deep basin maintenance.",
      "Standard 1-1/4\" universal connector attaches to all VPT vacuum heads and skimmer nets."
    ],
    specs: {
      "Extended Length": "3.0 Metres (10 Feet)",
      "Collapsed Length": "1.6 Metres",
      "Material": "Corrosion-Resistant Anodized Aluminium",
      "Locking Mechanism": "Dual External Compression Cam-Lock",
      "Tube Diameter": "Standard 32 mm outer / 28 mm inner"
    },
    featured: true,
    rating: 4.8,
    numReviews: 19,
    reviews: [
      {
        name: "Deepak Joshi",
        city: "Ujjain, MP",
        rating: 5,
        title: "Very rigid even when fully extended",
        comment: "Doesn't bend or flex in 8ft deep pool water. Cam lock is very smooth.",
        verified: true,
        createdAt: new Date("2026-05-18")
      }
    ]
  },
  {
    title: "Professional Cleaning Brush",
    category: "Sanitation & Upkeep",
    brand: "VPT Surface Care",
    price: 2000,
    mrp: 2600,
    description: "Curved 18-inch pool wall and floor scrub brush with heavy-density nylon bristles and reinforced aluminium backbone. Specifically curved to scrub concave pool corners.",
    imageUrl: "https://m.media-amazon.com/images/I/51azbonYrtS.jpg",
    images: [
      "https://m.media-amazon.com/images/I/51azbonYrtS.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2023/10/354770853/YV/QG/ZB/18908955/swimming-pool-cleaning-brush-500x500.jpg"
    ],
    highlights: [
      "Die-cast aluminium backplate prevents structural snapped handles during rigorous scrubbing.",
      "Curved edge design reaches corners and radius step transitions effortlessly.",
      "Chemical-resistant nylon bristles eliminate black algae roots without dislodging pool grout.",
      "Universal EZ-clip handle connects in seconds to standard telescopic poles."
    ],
    specs: {
      "Brush Width": "18 Inches (45 cm)",
      "Bristle Material": "High-Density Polypropylene / Nylon",
      "Backing": "Die-Cast Reinforced Aluminium",
      "Usage": "Plaster, Pebble, Vinyl & Tile Swimming Pools"
    },
    featured: false,
    rating: 4.7,
    numReviews: 15,
    reviews: [
      {
        name: "Manoj Chawla",
        city: "Pune, Maharashtra",
        rating: 5,
        title: "Algae removed within minutes",
        comment: "The curved edges make corner cleaning so easy. Bristles are stiff and durable.",
        verified: true,
        createdAt: new Date("2026-06-20")
      }
    ]
  },
  {
    title: "Deep Leaf Net Skimmer",
    category: "Sanitation & Upkeep",
    brand: "VPT SkimTech",
    price: 1450,
    mrp: 1900,
    description: "Reinforced deep-mesh leaf bag skimmer featuring a beveled leading edge. Scoops heavy wet leaves and floating garden debris effortlessly.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/LV/FH/IA/185944329/plastic-blue-deep-net-bag-1000x1000.JPG",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/3/LV/FH/IA/185944329/plastic-blue-deep-net-bag-1000x1000.JPG",
      "https://m.media-amazon.com/images/I/71+e7Yv0v9L._AC_SL1500_.jpg"
    ],
    highlights: [
      "Extra-deep structural mesh bag holds up to 15 kg of wet leaves without sagging.",
      "Hydrodynamic beveled plastic leading lip scrapes floor debris smoothly.",
      "Fine-weave micro-mesh traps small insects, pollen, and tree blossoms.",
      "Aluminum-reinforced structural frame prevents border deformation."
    ],
    specs: {
      "Frame Material": "ABS Thermoplastic with Aluminum Core",
      "Bag Depth": "45 cm Heavy-Capacity",
      "Mesh Quality": "Fine Micron Tear-Resistant Nylon",
      "Fitting": "Quick-Snap Locking Clip"
    },
    featured: false,
    rating: 4.8,
    numReviews: 11,
    reviews: [
      {
        name: "Prakash Yadav",
        city: "Nagpur, Maharashtra",
        rating: 5,
        title: "Essential for farm pools with lots of trees",
        comment: "Bag is massive and doesn't rip even when full of soaked wet leaves.",
        verified: true,
        createdAt: new Date("2026-07-15")
      }
    ]
  },
  {
    title: "White ABS Eyeball Nozzle",
    category: "Plumbing & Controls",
    brand: "VPT FlowDynamics",
    price: 2500,
    mrp: 3200,
    description: "Precision-molded directional return eyeball nozzle. Regulates filtered water flow direction and surface ripple circulation in pool basins.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/KU/WK/QZ/185944329/swimming-pool-nozzle-1000x1000.jpeg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/3/KU/WK/QZ/185944329/swimming-pool-nozzle-1000x1000.jpeg",
      "https://5.imimg.com/data5/SELLER/Default/2022/8/VC/BJ/PD/18908955/pvc-swimming-pool-skimmer-250x250.jpg"
    ],
    highlights: [
      "360-degree rotational eyeball allows customized circulation targeting dead zones.",
      "Constructed from UV-stabilized virgin white ABS thermoplastic.",
      "Threaded 1.5\" male NPT fitting for leak-proof conduit wall seal.",
      "Engineered for high flow velocity without creating backpressure on pumps."
    ],
    specs: {
      "Material": "Virgin ABS Polymer (Chlorine Proof)",
      "Color": "Classic Brilliant White",
      "Fitting Diameter": "1.5 Inch Male Thread",
      "Flow Type": "Adjustable Directional Jet",
      "Max Operating Pressure": "3.5 Bar"
    },
    featured: false,
    rating: 4.9,
    numReviews: 8,
    reviews: [
      {
        name: "Rohit Singhania",
        city: "Indore, MP",
        rating: 5,
        title: "Good fitting and durable ABS plastic",
        comment: "Replaced 6 old nozzles in our club pool. Perfect water circulation.",
        verified: true,
        createdAt: new Date("2026-06-30")
      }
    ]
  },
  {
    title: "Heavy Duty PVC Pool Skimmer",
    category: "Plumbing & Controls",
    brand: "VPT SkimMaster Pro",
    price: 2500,
    mrp: 3400,
    description: "Commercial wall-recessed surface skimmer designed for concrete and liner pools. Captures floating leaves, surface oils, and debris before sinking.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/VC/BJ/PD/18908955/pvc-swimming-pool-skimmer-250x250.jpg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/8/VC/BJ/PD/18908955/pvc-swimming-pool-skimmer-250x250.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2023/3/KU/WK/QZ/185944329/swimming-pool-nozzle-1000x1000.jpeg"
    ],
    highlights: [
      "Molded one-piece unibody body eliminates underground leakage risks.",
      "Includes removable heavy-mesh strainer basket and buoyant weir door flap.",
      "Top access deck lid with twist-lock mechanism for quick cleanout.",
      "Dual bottom suction ports (1.5\" & 2\") for main drain balancing."
    ],
    specs: {
      "Material": "Reinforced Structural PVC",
      "Installation Type": "Recessed Gunite / Concrete Wall Cast",
      "Flow Capacity": "Up to 150 LPM (9 m³/hr)",
      "Pipe Connection": "50 mm / 63 mm Solvent Socket",
      "Cover Diameter": "220 mm Deck Flush Lid"
    },
    featured: true,
    rating: 4.9,
    numReviews: 21,
    reviews: [
      {
        name: "Anand Deshmukh",
        city: "Gwalior, MP",
        rating: 5,
        title: "Sturdy skimmer with great suction flow",
        comment: "Used in our newly cast infinity pool. Weir door works flawlessly.",
        verified: true,
        createdAt: new Date("2026-05-14")
      }
    ]
  },
  {
    title: "20W LED Underwater Pool Light",
    category: "Atmospheric Lighting",
    brand: "VPT Lumina Aqua",
    price: 4500,
    mrp: 6200,
    description: "IP68 fully resin-filled submersible LED illumination fixture. Low-voltage 12V AC safety operation with ultra-bright lumen output.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/JH/NY/TM/18908955/20w-swimming-pool-led-light-500x500.jpg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/8/JH/NY/TM/18908955/20w-swimming-pool-led-light-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/8/GJ/YY/TV/18908955/20w-led-fountain-light-500x500.jpg",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800"
    ],
    highlights: [
      "IP68 100% waterproof rating with epoxy resin-filled internal electronics.",
      "12V AC safe low-voltage operation compliant with international electrical standards.",
      "High luminous flux SMD-2835 LED chips deliver vibrant illumination up to 8 meters.",
      "Slimline surface-mount wall bracket requires no niche recessing."
    ],
    specs: {
      "Wattage": "20 Watts High-Lumen",
      "Waterproof Standard": "IP68 Submersible Resin Sealed",
      "Input Voltage": "12V AC (Transformer Required)",
      "Lifespan": "50,000+ Operating Hours",
      "Beam Angle": "120 Degrees Wide Flood",
      "Housing Material": "Polycarbonate + Anti-UV Optical Lens"
    },
    featured: true,
    rating: 5.0,
    numReviews: 32,
    reviews: [
      {
        name: "Rajeev Agarwal",
        city: "Indore, MP",
        rating: 5,
        title: "Transformed our pool night ambiance completely",
        comment: "The illumination is crystal clear and very bright. Easy to mount with the bracket.",
        verified: true,
        createdAt: new Date("2026-06-05")
      },
      {
        name: "Karan Mehta",
        city: "Ahmedabad, Gujarat",
        rating: 5,
        title: "High quality resin fill, completely waterproof",
        comment: "Submerged 4 of these in our villa pool. 12V operation gives peace of mind.",
        verified: true,
        createdAt: new Date("2026-07-19")
      }
    ]
  },
  {
    title: "20W LED Fountain Light",
    category: "Atmospheric Lighting",
    brand: "VPT Lumina Aqua",
    price: 4500,
    mrp: 5900,
    description: "Stainless steel focal submersible spot projector for water fountains, architectural water cascades, and water park jets.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/GJ/YY/TV/18908955/20w-led-fountain-light-500x500.jpg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/8/GJ/YY/TV/18908955/20w-led-fountain-light-500x500.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/8/JH/NY/TM/18908955/20w-swimming-pool-led-light-500x500.jpg"
    ],
    highlights: [
      "Center-hole donut design allows nozzle jet spray to shoot directly through light beam.",
      "Full AISI-304 Stainless Steel casing with tempered safety optical glass.",
      "IP68 submersible certification with silicone double O-ring compression gland.",
      "Engineered for fountains, waterfalls, and decorative water canals."
    ],
    specs: {
      "Power Rating": "20 Watts High Output",
      "Casing Material": "AISI-304 Stainless Steel",
      "Waterproof Level": "IP68 Submerged",
      "Operating Voltage": "12V AC/DC",
      "Center Hole Diameter": "38 mm / 50 mm Nozzle Pass"
    },
    featured: false,
    rating: 4.8,
    numReviews: 14,
    reviews: [
      {
        name: "Vikas Trivedi",
        city: "Jabalpur, MP",
        rating: 5,
        title: "Center hole fits 1.5inch fountain nozzle cleanly",
        comment: "The water jet looks illuminated right from the base. Outstanding effect.",
        verified: true,
        createdAt: new Date("2026-06-18")
      }
    ]
  },
  {
    title: "Stainless Steel Fountain Nozzle",
    category: "Structural Accents",
    brand: "VPT HydroJet Pro",
    price: 1200,
    mrp: 1650,
    description: "Rust-proof high-pressure water jet spout. Produces thick, frothy water geysers and bubbling columns with high air-water aeration.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/BO/YO/YQ/18908955/stainless-steel-fountain-nozzle-250x250.jpg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/8/BO/YO/YQ/18908955/stainless-steel-fountain-nozzle-250x250.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2022/8/GJ/YY/TV/18908955/20w-led-fountain-light-500x500.jpg"
    ],
    highlights: [
      "Constructed from 100% solid AISI-304 stainless steel for corrosion resistance.",
      "Aerated geyser spray pattern maintains high visual volume with minimal wind drift.",
      "Internal water-level independent mixing chamber.",
      "Standard BSP threaded female connection for fast manifold installation."
    ],
    specs: {
      "Material": "AISI-304 Marine Grade Stainless Steel",
      "Jet Height": "1.0 to 3.5 Metres (Pump Dependent)",
      "Inlet Size": "1 Inch / 1.5 Inch Female Thread",
      "Spray Pattern": "Foamy Frothy Aerated Column",
      "Working Pressure": "50 - 150 kPa"
    },
    featured: false,
    rating: 4.9,
    numReviews: 17,
    reviews: [
      {
        name: "Sanjay Dixit",
        city: "Bhopal, MP",
        rating: 5,
        title: "Beautiful foaming effect in garden pond",
        comment: "Heavy stainless steel. Doesn't tarnish or rust. Creates great water sound.",
        verified: true,
        createdAt: new Date("2026-07-02")
      }
    ]
  },
  {
    title: "6kW Heavy Steam Bath Generator",
    category: "Spa & Wellness",
    brand: "VPT ThermalSpa",
    price: 35000,
    mrp: 45000,
    description: "Automated digital steam generator boiler system for residential luxury suites and commercial spa clubs. Quick steam generation in under 2 minutes.",
    imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/8/CB/TB/EO/18908955/6kw-steam-bath-generator-250x250.jpg",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/8/CB/TB/EO/18908955/6kw-steam-bath-generator-250x250.jpg",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800"
    ],
    highlights: [
      "Rapid steam delivery starts in 120 seconds with energy-saving dual heating elements.",
      "External waterproof digital touchscreen control panel for temperature & timer adjustment.",
      "Automatic auto-drain and descaling flush cycle extends heating element life.",
      "Overheat protection, dry-burn prevention, and pressure release safety valve built in."
    ],
    specs: {
      "Power Output": "6 kW (Heavy Duty)",
      "Room Volume Capacity": "Up to 250 - 350 Cubic Feet",
      "Voltage": "220V Single Phase / 415V 3-Phase Compatible",
      "Water Tank Material": "Grade 304 Stainless Steel Boiler",
      "Controller": "Waterproof Digital Display Touchpad",
      "Auto Drain": "Motorized Automatic Blowdown Valve"
    },
    featured: true,
    rating: 5.0,
    numReviews: 28,
    reviews: [
      {
        name: "Dr. Alok Malhotra",
        city: "Indore, MP",
        rating: 5,
        title: "Installed in our farmhouse sauna - absolute luxury",
        comment: "Generates thick aromatic steam rapidly. Digital panel is very intuitive. Yogendra Gupta's team provided excellent installation guidance.",
        verified: true,
        createdAt: new Date("2026-06-25")
      },
      {
        name: "Harshvardhan Rathi",
        city: "Mumbai, Maharashtra",
        rating: 5,
        title: "Commercial spa grade reliability",
        comment: "Running for 6 months continuously in our fitness center. Auto-drain keeps the tank clean.",
        verified: true,
        createdAt: new Date("2026-07-22")
      }
    ]
  }
];

async function seedDatabase() {
  console.log('Connecting to database:', mongodbUri);
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected! Purging and seeding rich catalog items...');
    
    await Product.deleteMany({});
    await Product.insertMany(productsData);
    console.log(`Successfully seeded ${productsData.length} rich products with multi-images, zoom gallery support, highlights, and reviews!`);
    
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
    process.exit(0);
  }
}

seedDatabase();
