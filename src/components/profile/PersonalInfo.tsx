
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Camera, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { type Address } from "@/types/user";

const PersonalInfo = () => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        toast({
          title: t("Profile picture updated"),
          description: t("Your profile picture has been updated successfully"),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      type: 'home',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Camera size={32} />
              </div>
            )}
          </div>
          <label
            htmlFor="profile-picture"
            className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Camera size={16} />
          </label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
        </div>

        <div className="flex-grow">
          <h2 className="text-xl font-semibold mb-4">{t("Personal Information")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder={t("Full Name")}
              className="w-full"
            />
            <Input
              type="email"
              placeholder={t("Email")}
              className="w-full"
            />
            <Input
              type="tel"
              placeholder={t("Phone Number")}
              className="w-full"
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("Preferred Language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{t("Saved Addresses")}</h3>
          <button
            onClick={handleAddAddress}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
          >
            <Plus size={16} />
            {t("Add Address")}
          </button>
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="p-4 border rounded-lg flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                    {t(address.type)}
                  </span>
                  {address.isDefault && (
                    <span className="text-sm text-gray-500">
                      ({t("Default")})
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {address.street}, {address.city}, {address.state} {address.zipCode}
                </p>
              </div>
              <button
                onClick={() => handleRemoveAddress(address.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
