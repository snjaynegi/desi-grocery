import { NutritionData } from "../components/NutritionChart";

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
  nutrition?: NutritionData;
}

export const dummyProducts: Product[] = [
  // 🥕 Vegetables (20 Products)
  {
    id: "1",
    name: "Fresh Tomato",
    price: 40,
    image: "https://images.unsplash.com/photo-1546470427-701d9e4d7b1f",
    category: "vegetables",
    description: "Juicy red tomatoes, perfect for curries and salads",
    origin: "Local",
    inStock: true,
  },
  {
    id: "2",
    name: "Potato – Premium",
    price: 30,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    category: "vegetables",
    description: "Versatile premium potatoes for everyday cooking",
    origin: "Local",
    inStock: true,
  },
  {
    id: "3",
    name: "Onion – Red",
    price: 35,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510",
    category: "vegetables",
    description: "Fresh red onions, a kitchen essential",
    origin: "Local",
    inStock: true,
  },
  {
    id: "4",
    name: "Carrot",
    price: 45,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
    category: "vegetables",
    description: "Crunchy orange carrots, rich in beta-carotene",
    origin: "Local",
    inStock: true,
  },
  {
    id: "5",
    name: "Green Capsicum",
    price: 60,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    category: "vegetables",
    description: "Crisp green bell peppers for stir-fries and salads",
    origin: "Local",
    inStock: true,
  },
  {
    id: "6",
    name: "Cucumber",
    price: 25,
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e",
    category: "vegetables",
    description: "Cool and refreshing cucumbers",
    origin: "Local",
    inStock: true,
  },
  {
    id: "7",
    name: "Cauliflower",
    price: 50,
    image: "https://images.unsplash.com/photo-1613743990305-d6a24239d48a",
    category: "vegetables",
    description: "Fresh white cauliflower head",
    origin: "Local",
    inStock: true,
  },
  {
    id: "8",
    name: "Cabbage",
    price: 35,
    image: "https://images.unsplash.com/photo-1551889774-349644cbb0b3",
    category: "vegetables",
    description: "Crunchy green cabbage for salads and sabzi",
    origin: "Local",
    inStock: true,
  },
  {
    id: "9",
    name: "Spinach",
    price: 30,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
    category: "vegetables",
    description: "Fresh iron-rich spinach leaves",
    origin: "Local",
    inStock: true,
  },
  {
    id: "10",
    name: "Brinjal (Eggplant)",
    price: 40,
    image: "https://images.unsplash.com/photo-1634462860453-243df403118a",
    category: "vegetables",
    description: "Glossy purple brinjal for bhartha and curries",
    origin: "Local",
    inStock: true,
  },
  {
    id: "11",
    name: "Lady Finger (Okra)",
    price: 45,
    image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2",
    category: "vegetables",
    description: "Tender fresh okra for frying and curries",
    origin: "Local",
    inStock: true,
  },
  {
    id: "12",
    name: "Green Peas",
    price: 55,
    image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15",
    category: "vegetables",
    description: "Sweet fresh green peas",
    origin: "Local",
    inStock: true,
  },
  {
    id: "13",
    name: "Beetroot",
    price: 35,
    image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82",
    category: "vegetables",
    description: "Deep red beetroot, great for salads and juices",
    origin: "Local",
    inStock: true,
  },
  {
    id: "14",
    name: "Radish",
    price: 25,
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979",
    category: "vegetables",
    description: "Crisp white radish (mooli) for parathas and salads",
    origin: "Local",
    inStock: true,
  },
  {
    id: "15",
    name: "Pumpkin",
    price: 40,
    image: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403",
    category: "vegetables",
    description: "Sweet orange pumpkin for sabzi and halwa",
    origin: "Local",
    inStock: true,
  },
  {
    id: "16",
    name: "Bottle Gourd",
    price: 30,
    image: "https://images.unsplash.com/photo-1593465439767-38b054da6085",
    category: "vegetables",
    description: "Light and nutritious bottle gourd (lauki)",
    origin: "Local",
    inStock: true,
  },
  {
    id: "17",
    name: "Bitter Gourd",
    price: 35,
    image: "https://images.unsplash.com/photo-1588391548564-53fc91c34071",
    category: "vegetables",
    description: "Healthy bitter gourd (karela) rich in nutrients",
    origin: "Local",
    inStock: true,
  },
  {
    id: "18",
    name: "Sweet Corn",
    price: 50,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076",
    category: "vegetables",
    description: "Fresh sweet corn on the cob",
    origin: "Local",
    inStock: true,
  },
  {
    id: "19",
    name: "Ginger",
    price: 80,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7",
    category: "vegetables",
    description: "Aromatic fresh ginger root",
    origin: "Local",
    inStock: true,
  },
  {
    id: "20",
    name: "Garlic",
    price: 60,
    image: "https://images.unsplash.com/photo-1501420193726-1f65acd36cda",
    category: "vegetables",
    description: "Pungent garlic bulbs for daily cooking",
    origin: "Local",
    inStock: true,
  },

  // 🌾 Staples (20 Products)
  {
    id: "21",
    name: "Basmati Rice",
    price: 120,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    category: "staples",
    description: "Premium long-grain aromatic basmati rice",
    origin: "India",
    inStock: true,
  },
  {
    id: "22",
    name: "Regular Rice",
    price: 60,
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6",
    category: "staples",
    description: "Everyday white rice for daily meals",
    origin: "India",
    inStock: true,
  },
  {
    id: "23",
    name: "Whole Wheat Atta",
    price: 55,
    image: "https://images.unsplash.com/photo-1586444248888-f9b7a783c6fb",
    category: "staples",
    description: "Fresh stone-ground whole wheat flour for chapatis",
    origin: "India",
    inStock: true,
  },
  {
    id: "24",
    name: "Multigrain Flour",
    price: 85,
    image: "https://images.unsplash.com/photo-1615475347354-c0833a7d43bd",
    category: "staples",
    description: "Nutritious blend of multiple grain flours",
    origin: "India",
    inStock: true,
  },
  {
    id: "25",
    name: "Toor Dal",
    price: 105,
    image: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a",
    category: "staples",
    description: "High-protein split pigeon pea lentils",
    origin: "India",
    inStock: true,
  },
  {
    id: "26",
    name: "Moong Dal",
    price: 95,
    image: "https://images.unsplash.com/photo-1604848698039-d84c2bb4b434",
    category: "staples",
    description: "Split yellow moong dal, easy to digest",
    origin: "India",
    inStock: true,
  },
  {
    id: "27",
    name: "Chana Dal",
    price: 90,
    image: "https://images.unsplash.com/photo-1585996177123-8bbfa0449388",
    category: "staples",
    description: "Split chickpea lentils for dal and snacks",
    origin: "India",
    inStock: true,
  },
  {
    id: "28",
    name: "Masoor Dal",
    price: 85,
    image: "https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f",
    category: "staples",
    description: "Red lentils that cook quickly and are protein-rich",
    origin: "India",
    inStock: true,
  },
  {
    id: "29",
    name: "Rajma (Kidney Beans)",
    price: 110,
    image: "https://images.unsplash.com/photo-1551462147-ff96a8d6b9a0",
    category: "staples",
    description: "Premium kidney beans for rajma chawal",
    origin: "India",
    inStock: true,
  },
  {
    id: "30",
    name: "Kabuli Chana",
    price: 100,
    image: "https://images.unsplash.com/photo-1515543904413-63117c31b352",
    category: "staples",
    description: "White chickpeas for chole and salads",
    origin: "India",
    inStock: true,
  },
  {
    id: "31",
    name: "Cooking Oil",
    price: 150,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    category: "staples",
    description: "Refined vegetable cooking oil",
    origin: "India",
    inStock: true,
  },
  {
    id: "32",
    name: "Mustard Oil",
    price: 130,
    image: "https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f",
    category: "staples",
    description: "Cold-pressed mustard oil with bold flavor",
    origin: "India",
    inStock: true,
  },
  {
    id: "33",
    name: "Sugar",
    price: 50,
    image: "https://images.unsplash.com/photo-1584847592298-230920927eae",
    category: "staples",
    description: "Refined white sugar for everyday use",
    origin: "India",
    inStock: true,
  },
  {
    id: "34",
    name: "Salt",
    price: 20,
    image: "https://images.unsplash.com/photo-1518110925495-5fe2c8828c26",
    category: "staples",
    description: "Iodized table salt",
    origin: "India",
    inStock: true,
  },
  {
    id: "35",
    name: "Poha (Flattened Rice)",
    price: 45,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db",
    category: "staples",
    description: "Light flattened rice for quick breakfast",
    origin: "India",
    inStock: true,
  },
  {
    id: "36",
    name: "Rava (Sooji)",
    price: 45,
    image: "https://images.unsplash.com/photo-1605493731111-a51f0c4e7780",
    category: "staples",
    description: "Fine semolina for upma, halwa, and rava dosa",
    origin: "India",
    inStock: true,
  },
  {
    id: "37",
    name: "Oats",
    price: 90,
    image: "https://images.unsplash.com/photo-1614961233913-a5113a4b34a1",
    category: "staples",
    description: "Rolled oats, rich in fiber for healthy breakfast",
    origin: "India",
    inStock: true,
  },
  {
    id: "38",
    name: "Corn Flour",
    price: 40,
    image: "https://images.unsplash.com/photo-1567165639743-94c9e7d13289",
    category: "staples",
    description: "Fine corn flour for thickening and baking",
    origin: "India",
    inStock: true,
  },
  {
    id: "39",
    name: "Besan (Gram Flour)",
    price: 70,
    image: "https://images.unsplash.com/photo-1567165639743-94c9e7d13289",
    category: "staples",
    description: "Chickpea flour for pakoras, cheela, and sweets",
    origin: "India",
    inStock: true,
  },
  {
    id: "40",
    name: "Jaggery",
    price: 80,
    image: "https://images.unsplash.com/photo-1604431696980-07e518647610",
    category: "staples",
    description: "Natural unrefined cane jaggery (gur)",
    origin: "India",
    inStock: true,
  },

  // 🍎 Fruits (20 Products)
  {
    id: "41",
    name: "Apple",
    price: 180,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    category: "fruits",
    description: "Crisp and sweet red apples",
    origin: "Kashmir",
    inStock: true,
  },
  {
    id: "42",
    name: "Banana",
    price: 40,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
    category: "fruits",
    description: "Naturally ripened yellow bananas",
    origin: "Local",
    inStock: true,
  },
  {
    id: "43",
    name: "Orange",
    price: 60,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b",
    category: "fruits",
    description: "Juicy oranges packed with vitamin C",
    origin: "Nagpur",
    inStock: true,
  },
  {
    id: "44",
    name: "Mango",
    price: 200,
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
    category: "fruits",
    description: "Sweet and juicy Alphonso mangoes",
    origin: "Ratnagiri",
    inStock: true,
  },
  {
    id: "45",
    name: "Grapes",
    price: 80,
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f",
    category: "fruits",
    description: "Sweet seedless green grapes",
    origin: "Nashik",
    inStock: true,
  },
  {
    id: "46",
    name: "Papaya",
    price: 50,
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe",
    category: "fruits",
    description: "Sweet ripe papaya, great for digestion",
    origin: "Local",
    inStock: true,
  },
  {
    id: "47",
    name: "Pineapple",
    price: 90,
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1",
    category: "fruits",
    description: "Sweet and tangy tropical pineapple",
    origin: "Local",
    inStock: true,
  },
  {
    id: "48",
    name: "Pomegranate",
    price: 140,
    image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc",
    category: "fruits",
    description: "Ruby-red pomegranate rich in antioxidants",
    origin: "Local",
    inStock: true,
  },
  {
    id: "49",
    name: "Watermelon",
    price: 40,
    image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18",
    category: "fruits",
    description: "Sweet refreshing watermelon",
    origin: "Local",
    inStock: true,
  },
  {
    id: "50",
    name: "Muskmelon",
    price: 50,
    image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50",
    category: "fruits",
    description: "Sweet and aromatic muskmelon (kharbooja)",
    origin: "Local",
    inStock: true,
  },
  {
    id: "51",
    name: "Strawberry",
    price: 120,
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    category: "fruits",
    description: "Sweet juicy red strawberries",
    origin: "Mahabaleshwar",
    inStock: true,
  },
  {
    id: "52",
    name: "Kiwi",
    price: 150,
    image: "https://images.unsplash.com/photo-1585059895524-72359e06133a",
    category: "fruits",
    description: "Tangy-sweet kiwi, packed with vitamin C",
    origin: "New Zealand",
    inStock: true,
  },
  {
    id: "53",
    name: "Guava",
    price: 45,
    image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46",
    category: "fruits",
    description: "Fresh vitamin-rich guavas",
    origin: "Local",
    inStock: true,
  },
  {
    id: "54",
    name: "Pear",
    price: 100,
    image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a",
    category: "fruits",
    description: "Juicy and sweet pears",
    origin: "Imported",
    inStock: true,
  },
  {
    id: "55",
    name: "Peach",
    price: 130,
    image: "https://images.unsplash.com/photo-1629828874514-3a9e239dcd5d",
    category: "fruits",
    description: "Soft, sweet and fragrant peaches",
    origin: "Imported",
    inStock: true,
  },
  {
    id: "56",
    name: "Plum",
    price: 110,
    image: "https://images.unsplash.com/photo-1502841616895-dbb9e3ef5ced",
    category: "fruits",
    description: "Sweet and tangy plums (aloo bukhara)",
    origin: "Himachal",
    inStock: true,
  },
  {
    id: "57",
    name: "Chikoo (Sapota)",
    price: 70,
    image: "https://images.unsplash.com/photo-1600707435583-35c8a3a2ffa3",
    category: "fruits",
    description: "Sweet brown chikoo with caramel-like flavor",
    origin: "Local",
    inStock: true,
  },
  {
    id: "58",
    name: "Blueberries",
    price: 250,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e",
    category: "fruits",
    description: "Antioxidant-rich fresh blueberries",
    origin: "Imported",
    inStock: true,
  },
  {
    id: "59",
    name: "Dragon Fruit",
    price: 200,
    image: "https://images.unsplash.com/photo-1527325678964-054242ca1e6c",
    category: "fruits",
    description: "Exotic vibrant pink dragon fruit",
    origin: "Vietnam",
    inStock: true,
  },
  {
    id: "60",
    name: "Coconut",
    price: 45,
    image: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb",
    category: "fruits",
    description: "Fresh whole coconut with tender water",
    origin: "Kerala",
    inStock: true,
  },
];

import { enrichProductsWithNutrition } from '../utils/nutritionGenerator';

const validateProducts = (products: Product[]): Product[] => {
  return products.map(product => {
    let imageUrl = product.image;
    
    if (imageUrl && !imageUrl.startsWith('http')) {
      if (imageUrl.startsWith('photo-')) {
        imageUrl = `https://images.unsplash.com/${imageUrl}`;
      } else if (!imageUrl.startsWith('/')) {
        const fallbacks = {
          vegetables: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
          fruits: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
          staples: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f"
        };
        imageUrl = fallbacks[product.category as keyof typeof fallbacks] || "/placeholder.svg";
      }
    }
    
    return {
      ...product,
      category: product.category || "other",
      image: imageUrl
    };
  });
};

const generateExtendedProducts = (): Product[] => {
  const baseProducts = enrichProductsWithNutrition(validateProducts([...dummyProducts]));
  const extendedProducts: Product[] = [...baseProducts];
  
  for (const product of extendedProducts) {
    if (product.image && !product.image.startsWith('http')) {
      product.image = `https://images.unsplash.com/${product.image}`;
    }
  }
  
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
