
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("Customer Support")}</h2>
      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">{t("Contact Us")}</h3>
          <p className="text-gray-600 mb-4">
            {t("Our customer service team is available 24/7")}
          </p>
          <button className="text-primary hover:text-primary/90">
            {t("Start Chat")}
          </button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">{t("FAQs")}</h3>
          <p className="text-gray-600 mb-4">
            {t("Find answers to common questions")}
          </p>
          <button className="text-primary hover:text-primary/90">
            {t("View FAQs")}
          </button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">{t("Email Support")}</h3>
          <p className="text-gray-600">support@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
