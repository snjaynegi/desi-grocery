
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

interface NutritionChartProps {
  nutrition: NutritionData;
  category: string;
}

const NutritionChart = ({ nutrition, category }: NutritionChartProps) => {
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
  
  // Nutrition value display with icon and progress bar
  const NutrientBar = ({ 
    value, 
    label, 
    icon: Icon,
    maxValue = 100, 
    isPredominant = false,
    tooltipText
  }: { 
    value: number; 
    label: string; 
    icon: React.ElementType;
    maxValue?: number;
    isPredominant?: boolean;
    tooltipText: string;
  }) => (
    <div className="mb-3">
      <div className="flex items-center mb-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`p-1 rounded-md mr-2 ${isPredominant ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                <Icon size={16} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-sm font-medium">
          {t(label)}: {value}%
        </span>
      </div>
      <Progress 
        value={value} 
        max={maxValue} 
        className={`h-2 ${isPredominant ? 'bg-primary/20' : 'bg-gray-100'}`}
      />
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-center mb-4">
        <BarChart className="text-primary mr-2" size={20} />
        <h3 className="text-lg font-semibold">{t("Nutritional Values")}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div>
          <NutrientBar 
            value={nutrition.calories} 
            label="Calories" 
            icon={Flame}
            isPredominant={predominantNutrient === "calories"}
            tooltipText={t("Energy content per serving")}
          />
          <NutrientBar 
            value={nutrition.protein} 
            label="Protein" 
            icon={Scale}
            isPredominant={predominantNutrient === "protein"}
            tooltipText={t("Essential for muscle building and repair")}
          />
          <NutrientBar 
            value={nutrition.carbs} 
            label="Carbohydrates" 
            icon={Wheat}
            isPredominant={predominantNutrient === "carbs"}
            tooltipText={t("Primary source of energy")}
          />
          <NutrientBar 
            value={nutrition.fat} 
            label="Fat" 
            icon={Heart}
            isPredominant={predominantNutrient === "fat"}
            tooltipText={t("Essential fatty acids for cell function")}
          />
        </div>
        <div>
          <NutrientBar 
            value={nutrition.fiber} 
            label="Fiber" 
            icon={Leaf}
            isPredominant={predominantNutrient === "fiber"}
            tooltipText={t("Aids digestion and promotes gut health")}
          />
          <NutrientBar 
            value={nutrition.vitamins} 
            label="Vitamins" 
            icon={Apple}
            isPredominant={predominantNutrient === "vitamins"}
            tooltipText={t("Essential for immune function and health")}
          />
          <NutrientBar 
            value={nutrition.minerals} 
            label="Minerals" 
            icon={Battery}
            isPredominant={predominantNutrient === "minerals"}
            tooltipText={t("Important for bones, muscles and overall health")}
          />
          <NutrientBar 
            value={nutrition.water} 
            label="Water Content" 
            icon={Droplets}
            isPredominant={predominantNutrient === "water"}
            tooltipText={t("Hydration and moisture content")}
          />
        </div>
      </div>
    </div>
  );
};

export default NutritionChart;
