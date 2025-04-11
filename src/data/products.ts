export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  description?: string;
  origin?: string;
  inStock?: boolean;
}

const getFallbackImage = (category: string) => {
  const fallbackImages = {
    vegetables: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    fruits: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    staples: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f",
    default: "https://images.unsplash.com/photo-1578687635445-f96693eae195"
  };
  
  return fallbackImages[category as keyof typeof fallbackImages] || fallbackImages.default;
};

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    price: 40,
    image: "https://images.unsplash.com/photo-1546470427-701d9e4d7b1f",
    category: "vegetables",
    description: "Locally sourced fresh tomatoes",
    origin: "Local",
    inStock: true,
  },
  {
    id: "2",
    name: "Organic Onions",
    price: 35,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510",
    category: "vegetables",
    description: "Chemical-free organic onions",
    origin: "Local",
    inStock: true,
  },
  {
    id: "3",
    name: "Basmati Rice",
    price: 120,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    category: "staples",
    description: "Premium long-grain basmati rice",
    origin: "India",
    inStock: true,
  },
  {
    id: "4",
    name: "Fresh Apples",
    price: 180,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    category: "fruits",
    description: "Crisp and sweet apples",
    origin: "Local",
    inStock: true,
  },
  {
    id: "5",
    name: "Organic Bananas",
    price: 60,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
    category: "fruits",
    description: "Naturally ripened organic bananas",
    origin: "Local",
    inStock: true,
  },
  {
    id: "6",
    name: "Green Chilies",
    price: 20,
    image: "https://images.unsplash.com/photo-1588891557811-5f9464cf4c72",
    category: "vegetables",
    description: "Fresh spicy green chilies",
    origin: "Local",
    inStock: true,
  },
  {
    id: "7",
    name: "Fresh Carrots",
    price: 45,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    category: "vegetables",
    description: "Crunchy fresh carrots",
    origin: "Local",
    inStock: true,
  },
  {
    id: "8",
    name: "Organic Potatoes",
    price: 50,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    category: "vegetables",
    description: "Versatile organic potatoes",
    origin: "Local",
    inStock: true,
  },
  {
    id: "9",
    name: "Fresh Mangoes",
    price: 200,
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
    category: "fruits",
    description: "Sweet and juicy mangoes",
    origin: "India",
    inStock: true,
  },
  {
    id: "10",
    name: "Organic Dal",
    price: 140,
    image: "https://images.unsplash.com/photo-1585996177123-8bbfa0449388",
    category: "staples",
    description: "High-protein organic lentils",
    origin: "India",
    inStock: true,
  },
  {
    id: "11",
    name: "Fresh Coconut",
    price: 45,
    image: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb",
    category: "vegetables",
    description: "Hydrating fresh coconuts",
    origin: "Local",
    inStock: true,
  },
  {
    id: "12",
    name: "Bell Peppers",
    price: 85,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    category: "vegetables",
    description: "Colorful sweet bell peppers",
    origin: "Local",
    inStock: true,
  },
  {
    id: "13",
    name: "Dragon Fruit",
    price: 250,
    image: "https://images.unsplash.com/photo-1527325678964-054242ca1e6c",
    category: "fruits",
    tags: ["exotic", "tropical"],
    description: "Vibrant pink exotic fruit with subtle sweet flavor",
    origin: "Vietnam",
    inStock: true,
  },
  {
    id: "14",
    name: "Kiwi",
    price: 120,
    image: "https://images.unsplash.com/photo-1585059895524-72359e06133a",
    category: "fruits",
    tags: ["exotic", "vitamin-rich"],
    description: "Tangy-sweet kiwi fruit, packed with vitamin C",
    origin: "New Zealand",
    inStock: true,
  },
  {
    id: "15",
    name: "Avocado",
    price: 180,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578",
    category: "fruits",
    tags: ["exotic", "superfood"],
    description: "Creamy, nutrient-dense avocados",
    origin: "Mexico",
    inStock: true,
  },
  {
    id: "16",
    name: "Passion Fruit",
    price: 220,
    image: "https://images.unsplash.com/photo-1604495772376-9657f0035eb5",
    category: "fruits",
    tags: ["exotic", "tropical"],
    description: "Tangy and aromatic passion fruit",
    origin: "Brazil",
    inStock: true,
  },
  {
    id: "17",
    name: "Rambutan",
    price: 280,
    image: "https://images.unsplash.com/photo-1583339793403-3d3110811376",
    category: "fruits",
    tags: ["exotic", "tropical"],
    description: "Sweet and juicy exotic fruit with hairy red skin",
    origin: "Southeast Asia",
    inStock: true,
  },
  {
    id: "18",
    name: "Bok Choy",
    price: 90,
    image: "https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d",
    category: "vegetables",
    tags: ["exotic", "leafy greens"],
    description: "Crisp Asian greens with mild flavor",
    origin: "China",
    inStock: true,
  },
  {
    id: "19",
    name: "Artichoke",
    price: 150,
    image: "https://images.unsplash.com/photo-1551465222-21f600a00902",
    category: "vegetables",
    tags: ["exotic", "mediterranean"],
    description: "Unique Mediterranean vegetable with tender heart",
    origin: "Italy",
    inStock: true,
  },
  {
    id: "20",
    name: "Purple Sweet Potato",
    price: 110,
    image: "https://images.unsplash.com/photo-1596097635121-14b38b1826f6",
    category: "vegetables",
    tags: ["exotic", "colorful"],
    description: "Vibrant purple sweet potatoes with rich flavor",
    origin: "Okinawa, Japan",
    inStock: true,
  },
  {
    id: "21",
    name: "Strawberries",
    price: 120,
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    category: "fruits",
    description: "Sweet, juicy strawberries",
    origin: "Local",
    inStock: true,
  },
  {
    id: "22",
    name: "Blueberries",
    price: 180,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e",
    category: "fruits",
    description: "Fresh, antioxidant-rich blueberries",
    origin: "Local",
    inStock: true,
  },
  {
    id: "23",
    name: "Watermelon",
    price: 80,
    image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18",
    category: "fruits",
    description: "Sweet, refreshing watermelon",
    origin: "Local",
    inStock: true,
  },
  {
    id: "24",
    name: "Pineapple",
    price: 90,
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1",
    category: "fruits",
    description: "Sweet and tangy pineapple",
    origin: "Imported",
    inStock: true,
  },
  {
    id: "25",
    name: "Oranges",
    price: 60,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b",
    category: "fruits",
    description: "Juicy, vitamin C-rich oranges",
    origin: "Local",
    inStock: true,
  },
  {
    id: "26",
    name: "Pomegranate",
    price: 140,
    image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc",
    category: "fruits",
    description: "Antioxidant-rich pomegranate",
    origin: "Local",
    inStock: true,
  },
  {
    id: "27",
    name: "Papaya",
    price: 70,
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe",
    category: "fruits",
    description: "Sweet, tropical papaya",
    origin: "Local",
    inStock: true,
  },
  {
    id: "28",
    name: "Guava",
    price: 45,
    image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46",
    category: "fruits",
    description: "Fresh, vitamin-rich guavas",
    origin: "Local",
    inStock: true,
  },
  {
    id: "29",
    name: "Lychee",
    price: 220,
    image: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18",
    category: "fruits",
    tags: ["exotic", "seasonal"],
    description: "Sweet, fragrant lychees",
    origin: "Local",
    inStock: true,
  },
  {
    id: "30",
    name: "Custard Apple",
    price: 160,
    image: "https://images.unsplash.com/photo-1600707435583-35c8a3a2ffa3",
    category: "fruits",
    description: "Sweet, creamy custard apples",
    origin: "Local",
    inStock: true,
  },
  {
    id: "31",
    name: "Spinach",
    price: 30,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    category: "vegetables",
    description: "Fresh, iron-rich spinach leaves",
    origin: "Local",
    inStock: true,
  },
  {
    id: "32",
    name: "Broccoli",
    price: 65,
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
    category: "vegetables",
    description: "Nutritious broccoli florets",
    origin: "Local",
    inStock: true,
  },
  {
    id: "33",
    name: "Cauliflower",
    price: 50,
    image: "https://images.unsplash.com/photo-1613743990305-d6a24239d48a",
    category: "vegetables",
    description: "Fresh cauliflower head",
    origin: "Local",
    inStock: true,
  },
  {
    id: "34",
    name: "Cabbage",
    price: 35,
    image: "https://images.unsplash.com/photo-1551889774-349644cbb0b3",
    category: "vegetables",
    description: "Crunchy green cabbage",
    origin: "Local",
    inStock: true,
  },
  {
    id: "35",
    name: "Eggplant",
    price: 40,
    image: "https://images.unsplash.com/photo-1634462860453-243df403118a",
    category: "vegetables",
    description: "Glossy purple eggplant",
    origin: "Local",
    inStock: true,
  },
  {
    id: "36",
    name: "Zucchini",
    price: 55,
    image: "https://images.unsplash.com/photo-1583687355032-89b902b7335f",
    category: "vegetables",
    description: "Fresh green zucchini",
    origin: "Local",
    inStock: true,
  },
  {
    id: "37",
    name: "Lady Finger",
    price: 45,
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2",
    category: "vegetables",
    description: "Tender, fresh lady finger",
    origin: "Local",
    inStock: true,
  },
  {
    id: "38",
    name: "Bitter Gourd",
    price: 35,
    image: "https://images.unsplash.com/photo-1588391548564-53fc91c34071",
    category: "vegetables",
    description: "Nutritious bitter gourd",
    origin: "Local",
    inStock: true,
  },
  {
    id: "39",
    name: "Bottle Gourd",
    price: 30,
    image: "https://images.unsplash.com/photo-1593465439767-38b054da6085",
    category: "vegetables",
    description: "Fresh bottle gourd",
    origin: "Local",
    inStock: true,
  },
  {
    id: "40",
    name: "Garlic",
    price: 25,
    image: "https://images.unsplash.com/photo-1501420193726-1f65acd36cda",
    category: "vegetables",
    description: "Aromatic garlic bulbs",
    origin: "Local",
    inStock: true,
  },
  {
    id: "41",
    name: "Whole Wheat Flour",
    price: 60,
    image: "https://images.unsplash.com/photo-1586444248888-f9b7a783c6fb",
    category: "staples",
    description: "Nutritious whole wheat flour",
    origin: "Local",
    inStock: true,
  },
  {
    id: "42",
    name: "White Rice",
    price: 85,
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6",
    category: "staples",
    description: "Premium quality white rice",
    origin: "Local",
    inStock: true,
  },
  {
    id: "43",
    name: "Brown Rice",
    price: 110,
    image: "https://images.unsplash.com/photo-1595837037660-61eae83032bc",
    category: "staples",
    description: "Nutritious brown rice",
    origin: "Local",
    inStock: true,
  },
  {
    id: "44",
    name: "Moong Dal",
    price: 95,
    image: "https://images.unsplash.com/photo-1604848698039-d84c2bb4b434",
    category: "staples",
    description: "Split yellow moong dal",
    origin: "Local",
    inStock: true,
  },
  {
    id: "45",
    name: "Toor Dal",
    price: 105,
    image: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a",
    category: "staples",
    description: "High-protein toor dal",
    origin: "Local",
    inStock: true,
  },
  {
    id: "46",
    name: "Urad Dal",
    price: 115,
    image: "https://images.unsplash.com/photo-1596097635121-14b38b1826f6",
    category: "staples",
    description: "Black gram dal",
    origin: "Local",
    inStock: true,
  },
  {
    id: "47",
    name: "Refined Flour",
    price: 55,
    image: "https://images.unsplash.com/photo-1615475347354-c0833a7d43bd",
    category: "staples",
    description: "Fine refined flour",
    origin: "Local",
    inStock: true,
  },
  {
    id: "48",
    name: "Gram Flour",
    price: 70,
    image: "https://images.unsplash.com/photo-1567165639743-94c9e7d13289",
    category: "staples",
    description: "Chickpea flour (besan)",
    origin: "Local",
    inStock: true,
  },
  {
    id: "49",
    name: "Semolina",
    price: 45,
    image: "https://images.unsplash.com/photo-1605493731111-a51f0c4e7780",
    category: "staples",
    description: "Fine semolina (sooji)",
    origin: "Local",
    inStock: true,
  },
  {
    id: "50",
    name: "Sugar",
    price: 50,
    image: "https://images.unsplash.com/photo-1584847592298-230920927eae",
    category: "staples",
    description: "Refined white sugar",
    origin: "Local",
    inStock: true,
  },
];

// Make sure no product has an empty category string
const validateProducts = (products: Product[]): Product[] => {
  return products.map(product => ({
    ...product,
    category: product.category || "other"
  }));
};

const generateExtendedProducts = (): Product[] => {
  const baseProducts = validateProducts([...dummyProducts]);
  const extendedProducts: Product[] = [...baseProducts];
  
  const variantsNeeded = 500 - baseProducts.length;
  const variantsPerProduct = Math.ceil(variantsNeeded / baseProducts.length);
  
  for (let i = 0; i < baseProducts.length; i++) {
    const baseProduct = baseProducts[i];
    
    for (let j = 1; j <= variantsPerProduct; j++) {
      if (extendedProducts.length >= 500) break;
      
      const variantId = `${baseProduct.id}-v${j}`;
      let variantName = baseProduct.name;
      
      if (baseProduct.category === "vegetables" || baseProduct.category === "fruits") {
        const prefixes = ["Organic", "Premium", "Fresh", "Local", "Farm Fresh", "Seasonal"];
        variantName = `${prefixes[j % prefixes.length]} ${baseProduct.name}`;
      } else if (baseProduct.category === "staples") {
        const prefixes = ["Premium", "Organic", "Whole Grain", "Stone-Ground", "Pure"];
        variantName = `${prefixes[j % prefixes.length]} ${baseProduct.name}`;
      }
      
      const priceVariation = 0.8 + (Math.random() * 0.4);
      const variantPrice = Math.round(baseProduct.price * priceVariation);
      
      const variant: Product = {
        ...baseProduct,
        id: variantId,
        name: variantName,
        price: variantPrice,
        image: baseProduct.image,
      };
      
      extendedProducts.push(variant);
    }
  }
  
  return extendedProducts.slice(0, 500);
};

export const extendedProducts = generateExtendedProducts();

export default extendedProducts;
