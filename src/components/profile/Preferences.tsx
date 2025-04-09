
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Preferences = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("Notifications")}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t("Email Notifications")}</label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t("SMS Notifications")}</label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t("App Notifications")}</label>
            <Switch />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{t("Dietary Preferences")}</h2>
        <Select defaultValue="none">
          <SelectTrigger>
            <SelectValue placeholder={t("Select dietary preferences")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{t("No restrictions")}</SelectItem>
            <SelectItem value="vegetarian">{t("Vegetarian")}</SelectItem>
            <SelectItem value="vegan">{t("Vegan")}</SelectItem>
            <SelectItem value="gluten-free">{t("Gluten-free")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{t("Accessibility")}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t("High Contrast Mode")}</label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t("Screen Reader Support")}</label>
            <Switch />
          </div>
          <Select defaultValue="medium">
            <SelectTrigger>
              <SelectValue placeholder={t("Text Size")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">{t("Small")}</SelectItem>
              <SelectItem value="medium">{t("Medium")}</SelectItem>
              <SelectItem value="large">{t("Large")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
