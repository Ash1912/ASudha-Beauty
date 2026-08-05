export const products = [
 // Add these new skincare products at the beginning or end of your products array

// ============= MULTANI MITTI POWDER =============
{
  id: 11001,
  name: "Multani Mitti Powder",
  category: "Skincare",
  subCategory: "Face Pack",
  type: "Clay Powder",
  itemNo: "SK-001",
  mrp: 50.00,
  price: 50.00,
  image: "/assets/images/products/facepack/MultaniMitti/MultaniMitti.jpeg",
  images: [
    "/assets/images/products/facepack/MultaniMitti/MultaniMitti.jpeg"
  ],
  video: "/assets/images/products/facepack/MultaniMitti/MultaniMitti.mp4",
  videoThumbnail:"/assets/images/products/facepack/MultaniMitti/videoThumbnailMultaniMitti.jpeg",
  description: "100% Natural Multani Mitti (Fuller's Earth) powder for deep cleansing and oil control. Makes your skin glow naturally. This pure Ayurvedic goodness helps in deep cleansing, removes excess oil, and improves skin texture. Trusted by nature, loved by you.",
  howToUse: "Mix 2 tablespoons of Multani Mitti powder with rose water, milk, or plain water to form a smooth paste. Apply evenly on face and neck. Leave for 10-15 minutes until dry. Rinse with lukewarm water. Use 2-3 times per week for best results.",
  ingredients: "100% Natural Fuller's Earth (Multani Mitti) - No added chemicals, parabens, or preservatives.",
  shades: [],
  availableShades: 0,
  inStock: true,
  bestSeller: true,
  rating: 4.8,
  reviews: 456,
  benefits: [
    "Deep cleansing",
    "Oil control",
    "Improves skin texture",
    "Makes skin glow",
    "Natural and pure",
    "Ayurvedic goodness"
  ],
  weight: "100gm",
  packing: "100gm x 50 Pcs"
},

// ============= UBTAN POWDER =============
{
  id: 11002,
  name: "Ubtan Powder - Ancient Radiance",
  category: "Skincare",
  subCategory: "Face Pack",
  type: "Herbal Powder",
  itemNo: "SK-002",
  mrp: 50.00,
  price: 50.00,
  image: "/assets/images/products/facepack/Ubtan/Ubtan.jpeg",
  images: [
    "/assets/images/products/facepack/Ubtan/Ubtan.jpeg"
  ],
  video: "/assets/images/products/facepack/Ubtan/Ubtan.mp4",
  videoThumbnail:"/assets/images/products/facepack/Ubtan/videoThumbnailUbtan.jpeg",
  description: "Made with the goodness of traditional ingredients grown to nourish, cleanse and revitalize your natural glow. A potent blend of nature and Ayurveda for healthy, radiant skin. Chemical free, paraben free, and preservative free. Suitable for all skin types.",
  howToUse: "Take 2 tablespoons of Ubtan powder. Add rose water, milk, curd, or honey to form a paste. Apply evenly on face and neck. Leave for 10-15 minutes. Gently scrub in circular motions while washing off with lukewarm water. Use 2-3 times per week.",
  ingredients: "Traditional blend of Ayurvedic herbs and natural ingredients including Turmeric, Sandalwood, Gram Flour, and other herbal extracts. 100% natural with no chemicals.",
  shades: [],
  availableShades: 0,
  inStock: true,
  bestSeller: true,
  rating: 4.7,
  reviews: 389,
  benefits: [
    "Nourishes and cleanses",
    "Revitalizes natural glow",
    "Chemical free",
    "Paraben free",
    "Preservative free",
    "Suitable for all skin types"
  ],
  weight: "50gm",
  packing: "50gm x 60 Pcs"
}
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Helper function to get products by subCategory
export const getProductsBySubCategory = (subCategory) => {
  return products.filter(product => product.subCategory === subCategory);
};

// Helper function to get best sellers
export const getBestSellers = () => {
  return products.filter(product => product.bestSeller === true);
};

// Helper function to get products with videos
export const getProductsWithVideos = () => {
  return products.filter(product => product.video && product.video !== "");
};

// Helper function to get products with catalogs
export const getProductsWithCatalogs = () => {
  return products.filter(product => product.catalog);
};

// Helper function to search products - FIXED with type checking
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => {
    // Basic text search
    const nameMatch = product.name.toLowerCase().includes(lowercaseQuery);
    const descMatch = product.description.toLowerCase().includes(lowercaseQuery);
    const categoryMatch = product.category.toLowerCase().includes(lowercaseQuery);
    const subCategoryMatch = product.subCategory?.toLowerCase().includes(lowercaseQuery) || false;
    const itemNoMatch = product.itemNo?.toLowerCase().includes(lowercaseQuery) || false;
    const typeMatch = product.type?.toLowerCase().includes(lowercaseQuery) || false;
    
    // Shade search with type checking
    let shadeMatch = false;
    if (Array.isArray(product.shades)) {
      // If shades is an array, search within it
      shadeMatch = product.shades.some(shade => 
        shade.toLowerCase().includes(lowercaseQuery)
      );
    } else if (typeof product.shades === 'number') {
      // If shades is a number, check if the query matches number-related terms
      const shadeNumberMatch = 
        `${product.shades} shades`.toLowerCase().includes(lowercaseQuery) ||
        `${product.shades} colors`.toLowerCase().includes(lowercaseQuery);
      shadeMatch = shadeNumberMatch;
    }
    
    // Benefit search (if benefits exist)
    const benefitMatch = product.benefits?.some(benefit => 
      benefit.toLowerCase().includes(lowercaseQuery)
    ) || false;
    
    return nameMatch || descMatch || categoryMatch || subCategoryMatch || 
           itemNoMatch || typeMatch || shadeMatch || benefitMatch;
  });
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Helper function to get related products
export const getRelatedProducts = (product, limit = 4) => {
  return products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
};