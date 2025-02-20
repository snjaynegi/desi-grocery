
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Security = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("Password")}</h2>
        <div className="space-y-4">
          <Input type="password" placeholder={t("Current Password")} />
          <Input type="password" placeholder={t("New Password")} />
          <Input type="password" placeholder={t("Confirm New Password")} />
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            {t("Change Password")}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{t("Two-Factor Authentication")}</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{t("Enable 2FA")}</p>
            <p className="text-sm text-gray-600">
              {t("Add an extra layer of security to your account")}
            </p>
          </div>
          <Switch />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{t("Account")}</h2>
        <button className="text-red-500 hover:text-red-600">
          {t("Delete Account")}
        </button>
      </div>
    </div>
  );
};

export default Security;
