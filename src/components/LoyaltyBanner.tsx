
import { useTranslation } from "react-i18next";
import { Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface LoyaltyBannerProps {
  user: {
    loyaltyPoints?: number;
    membershipTier?: 'bronze' | 'silver' | 'gold';
  };
}

const LoyaltyBanner = ({ user }: LoyaltyBannerProps) => {
  const { t } = useTranslation();
  const points = user?.loyaltyPoints || 0;
  const tier = user?.membershipTier || 'bronze';
  
  // Tier thresholds
  const tierThresholds = {
    bronze: { min: 0, max: 1000 },
    silver: { min: 1000, max: 5000 },
    gold: { min: 5000, max: 10000 }
  };
  
  const currentTier = tierThresholds[tier];
  const progress = ((points - currentTier.min) / (currentTier.max - currentTier.min)) * 100;
  const pointsToNextTier = Math.max(0, currentTier.max - points);
  
  // Next tier label
  const nextTier = tier === 'bronze' 
    ? 'silver' 
    : tier === 'silver' 
      ? 'gold' 
      : null;

  const tierColors = {
    bronze: 'from-amber-700 to-amber-500',
    silver: 'from-gray-400 to-gray-300',
    gold: 'from-yellow-600 to-yellow-400'
  };
  
  return (
    <div className={`mb-8 rounded-lg p-4 bg-gradient-to-r ${tierColors[tier]} text-white shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Award className="h-6 w-6 mr-2" />
          <div>
            <h3 className="font-bold">{t(`${tier.charAt(0).toUpperCase() + tier.slice(1)} Member`)}</h3>
            <p className="text-sm">{points} {t("loyalty points")}</p>
          </div>
        </div>
        <Link to="/profile" className="text-white flex items-center hover:underline">
          <span className="text-sm">{t("My rewards")}</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      {nextTier && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>{tier}</span>
            <span>{nextTier}</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/30" />
          <p className="text-xs mt-1">
            {pointsToNextTier} {t("points to reach")} {t(nextTier)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoyaltyBanner;
