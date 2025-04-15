
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface PersonalizedRecommendationsProps {
  products: Product[];
}

const PersonalizedRecommendations = ({ products }: PersonalizedRecommendationsProps) => {
  const { t } = useTranslation();

  if (!products.length) return null;

  return (
    <div className="mb-10 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t("Recommended for You")}</h2>
        <Link to="/recommendations" className="text-primary flex items-center hover:underline">
          {t("See all")} <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
