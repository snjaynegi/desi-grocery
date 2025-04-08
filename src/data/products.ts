
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
  // Adding international/exotic fruits and vegetables
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
  }
];
