
import { useTranslation } from "react-i18next";
import { 
  BarChart, 
  Battery, 
  Droplets, 
  Flame, 
  Heart, 
  Leaf, 
  Scale, 
  Apple, 
  Wheat 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: number;
  minerals: number;
  water: number;
}

interface CompactNutritionChartProps {
  nutrition: NutritionData;
  category: string;
}

const CompactNutritionChart = ({ nutrition, category }: CompactNutritionChartProps) => {
  const { t } = useTranslation();

  // Determine the predominant nutrient based on category
  const getPredominantNutrient = (category: string): keyof NutritionData => {
    switch (category) {
      case "fruits":
        return "vitamins";
      case "vegetables":
        return "fiber";
      case "staples":
        return "carbs";
      default:
        return "calories";
    }
  };

  const predominantNutrient = getPredominantNutrient(category);
  
  // Mini nutrition indicator with icon and value
  const NutrientIndicator = ({ 
    value, 
    label, 
    icon: Icon,
    isPredominant = false,
    tooltipText
  }: { 
    value: number; 
    label: string; 
    icon: React.ElementType;
    isPredominant?: boolean;
    tooltipText: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex flex-col items-center p-1 ${isPredominant ? 'text-primary' : 'text-gray-600'}`}>
            <div className={`p-1 rounded-full ${isPredominant ? 'bg-primary text-white' : 'bg-primary/10'}`}>
              <Icon size={12} />
            </div>
            <span className="text-xs font-medium mt-1">{value}%</span>
            <span className="text-[10px]">{t(label)}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <BarChart className="text-primary mr-1" size={16} />
          <h3 className="text-sm font-semibold">{t("Nutritional Values")}</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-8 gap-1">
        <NutrientIndicator 
          value={nutrition.calories} 
          label="Cal" 
          icon={Flame}
          isPredominant={predominantNutrient === "calories"}
          tooltipText={t("Energy content per serving")}
        />
        <NutrientIndicator 
          value={nutrition.protein} 
          label="Pro" 
          icon={Scale}
          isPredominant={predominantNutrient === "protein"}
          tooltipText={t("Essential for muscle building and repair")}
        />
        <NutrientIndicator 
          value={nutrition.carbs} 
          label="Carb" 
          icon={Wheat}
          isPredominant={predominantNutrient === "carbs"}
          tooltipText={t("Primary source of energy")}
        />
        <NutrientIndicator 
          value={nutrition.fat} 
          label="Fat" 
          icon={Heart}
          isPredominant={predominantNutrient === "fat"}
          tooltipText={t("Essential fatty acids for cell function")}
        />
        <NutrientIndicator 
          value={nutrition.fiber} 
          label="Fiber" 
          icon={Leaf}
          isPredominant={predominantNutrient === "fiber"}
          tooltipText={t("Aids digestion and promotes gut health")}
        />
        <NutrientIndicator 
          value={nutrition.vitamins} 
          label="Vit" 
          icon={Apple}
          isPredominant={predominantNutrient === "vitamins"}
          tooltipText={t("Essential for immune function and health")}
        />
        <NutrientIndicator 
          value={nutrition.minerals} 
          label="Min" 
          icon={Battery}
          isPredominant={predominantNutrient === "minerals"}
          tooltipText={t("Important for bones, muscles and overall health")}
        />
        <NutrientIndicator 
          value={nutrition.water} 
          label="H₂O" 
          icon={Droplets}
          isPredominant={predominantNutrient === "water"}
          tooltipText={t("Hydration and moisture content")}
        />
      </div>
    </div>
  );
};

export default CompactNutritionChart;
