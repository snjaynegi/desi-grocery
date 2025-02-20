
import { useTranslation } from "react-i18next";

const Subscriptions = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("Subscriptions")}</h2>
      <div className="p-6 border rounded-lg">
        <h3 className="font-medium mb-2">{t("Current Plan")}</h3>
        <p className="text-gray-600">{t("Basic Plan")}</p>
        <button className="mt-4 text-primary hover:text-primary/90">
          {t("Upgrade to Premium")}
        </button>
      </div>
    </div>
  );
};

export default Subscriptions;
