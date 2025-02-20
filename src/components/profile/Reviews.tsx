
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("My Reviews")}</h2>
      <div className="text-center py-8">
        <p className="text-gray-600">{t("You haven't written any reviews yet")}</p>
      </div>
    </div>
  );
};

export default Reviews;
