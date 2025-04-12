
import { NutritionData } from "../components/NutritionChart";
import { Product } from "../data/products";

// Generate nutrition data based on product category and name
export const generateNutritionData = (product: Product): NutritionData => {
  const base = product.name.toLowerCase();
  const category = product.category;
  
  // Base values by category
  const baseValues: Record<string, Partial<NutritionData>> = {
    fruits: {
      calories: 40,
      protein: 10,
      carbs: 60,
      fat: 5,
      fiber: 35,
      vitamins: 80,
      minerals: 45,
      water: 85
    },
    vegetables: {
      calories: 30,
      protein: 20,
      carbs: 40,
      fat: 5,
      fiber: 70,
      vitamins: 75,
      minerals: 60,
      water: 90
    },
    staples: {
      calories: 75,
      protein: 40,
      carbs: 85,
      fat: 15,
      fiber: 45,
      vitamins: 30,
      minerals: 55,
      water: 10
    }
  };
  
  // Get base values for category or use default
  const baseNutrition = baseValues[category] || {
    calories: 50,
    protein: 25,
    carbs: 60,
    fat: 15,
    fiber: 40,
    vitamins: 50,
    minerals: 50,
    water: 50
  };
  
  // Specific modifiers based on product name keywords
  const modifiers: Record<string, Partial<NutritionData>> = {
    // Fruits
    "berry": { vitamins: 90, fiber: 50, water: 80 },
    "banana": { calories: 65, carbs: 75, minerals: 90 }, // high in minerals (potassium)
    "apple": { fiber: 60, vitamins: 65, water: 85 },
    "citrus": { vitamins: 95, water: 88, minerals: 60 },
    "orange": { vitamins: 90, water: 85, fiber: 45 },
    "mango": { vitamins: 85, water: 80, fiber: 45 },
    "avocado": { fat: 75, fiber: 60, vitamins: 70 },
    "watermelon": { water: 95, vitamins: 60, calories: 30 },
    
    // Vegetables
    "leafy": { vitamins: 90, minerals: 80, water: 90, calories: 20 },
    "spinach": { minerals: 80, vitamins: 95, protein: 40, fiber: 60 },
    "carrot": { vitamins: 90, fiber: 60, water: 88 },
    "potato": { carbs: 80, fiber: 40, minerals: 60 },
    "onion": { minerals: 65, fiber: 50, water: 85 },
    "tomato": { vitamins: 75, water: 90, fiber: 40 },
    "pepper": { vitamins: 85, water: 90, fiber: 50 },
    "broccoli": { protein: 50, fiber: 70, vitamins: 85 },
    
    // Staples
    "rice": { carbs: 90, protein: 30, fiber: 10 },
    "pasta": { carbs: 85, protein: 35, fiber: 15 },
    "flour": { carbs: 90, protein: 40, fiber: 20 },
    "dal": { protein: 80, fiber: 70, carbs: 60 },
    "oats": { fiber: 80, protein: 50, minerals: 60 },
    "quinoa": { protein: 70, fiber: 65, minerals: 75 }
  };
  
  // Start with base nutrition
  const nutrition: NutritionData = {
    calories: baseNutrition.calories || 50,
    protein: baseNutrition.protein || 25,
    carbs: baseNutrition.carbs || 60,
    fat: baseNutrition.fat || 15,
    fiber: baseNutrition.fiber || 40,
    vitamins: baseNutrition.vitamins || 50,
    minerals: baseNutrition.minerals || 50,
    water: baseNutrition.water || 50
  };
  
  // Apply modifiers based on product name
  for (const [keyword, modifier] of Object.entries(modifiers)) {
    if (base.includes(keyword.toLowerCase())) {
      Object.entries(modifier).forEach(([key, value]) => {
        // Skip unknown properties that aren't in NutritionData
        if (key in nutrition && typeof value === 'number') {
          // Apply the modifier but ensure value stays between 5-95
          (nutrition as any)[key] = Math.min(95, Math.max(5, value));
        }
      });
    }
  }
  
  // Add some randomness (±10%) to make each product unique
  Object.keys(nutrition).forEach(key => {
    const variation = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
    const currentValue = (nutrition as any)[key];
    (nutrition as any)[key] = Math.min(95, Math.max(5, Math.round(currentValue * variation)));
  });
  
  return nutrition;
};

// Apply nutrition data to products
export const enrichProductsWithNutrition = (products: Product[]): Product[] => {
  return products.map(product => ({
    ...product,
    nutrition: generateNutritionData(product)
  }));
};
