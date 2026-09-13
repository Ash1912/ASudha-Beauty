const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // ⚠️ REPLACE THIS ARRAY WITH YOUR ACTUAL PRODUCTS DATA FROM src/data/products.js
    const products = [
      {
        name: "Multani Mitti Powder",
        category: "Skincare",
        description: "Pure, natural Multani Mitti for deep cleansing and oil control.",
        price: 299,
        image: "/assets/images/home/MultaniMitti_Hero.jpeg",
        countInStock: 100,
        rating: 4.8,
        ingredients: "100% Pure Calcium Bentonite",
        benefits: ["Deep Cleansing", "Oil Control"],
        bestSeller: true
      }
    ];

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();