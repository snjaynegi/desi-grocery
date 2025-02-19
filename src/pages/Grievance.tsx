
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Grievance = () => {
  const { t } = useTranslation();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !description) {
      toast({
        title: t("Error"),
        description: t("Please fill in all fields"),
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be sent to an API
    toast({
      title: t("Thank you for your feedback"),
      description: t("We will review your submission shortly"),
    });

    setType("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {t("Submit Feedback")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("Type")}
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complaint">{t("Complaint")}</SelectItem>
                  <SelectItem value="suggestion">{t("Suggestion")}</SelectItem>
                  <SelectItem value="issue">{t("Technical Issue")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("Description")}
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("Please describe your feedback in detail")}
                className="min-h-[150px]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("Submit")}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Grievance;
