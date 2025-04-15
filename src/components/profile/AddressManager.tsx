
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Plus, Edit, Trash2, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Address } from "@/types/user";
import { Badge } from "@/components/ui/badge";

const AddressManager = () => {
  const { t } = useTranslation();
  const supabase = useSupabaseClient();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
    label: '',
    notes: '',
  });
  const [deliverySchedule, setDeliverySchedule] = useState<{day: string, timeSlot: string}[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['8:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'];

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          return;
        }
        
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('userId', session.user.id);
          
        if (error) {
          console.error('Error fetching addresses:', error);
          return;
        }
        
        setAddresses(data || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchAddresses();
  }, [supabase]);

  const handleAddAddress = () => {
    setNewAddress({
      type: 'home',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: addresses.length === 0,
      label: '',
      notes: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setNewAddress(address);
    setIsDialogOpen(true);
  };

  const handleScheduleDelivery = (address: Address) => {
    setCurrentAddress(address);
    setDeliverySchedule(address.frequentDeliveryTimes || []);
    setIsScheduleDialogOpen(true);
  };

  const handleSubmitAddress = async () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      toast({
        title: t("Missing Information"),
        description: t("Please fill in all required fields"),
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          title: t("Authentication Error"),
          description: t("Please sign in to manage addresses"),
          variant: "destructive",
        });
        return;
      }

      // If setting a new default address, update all other addresses
      if (newAddress.isDefault) {
        await supabase
          .from('addresses')
          .update({ isDefault: false })
          .eq('userId', session.user.id)
          .neq('id', newAddress.id || '0');
      }
      
      if (newAddress.id) {
        // Update existing address
        const { error } = await supabase
          .from('addresses')
          .update({
            type: newAddress.type,
            street: newAddress.street,
            city: newAddress.city,
            state: newAddress.state,
            zipCode: newAddress.zipCode,
            isDefault: newAddress.isDefault,
            label: newAddress.label,
            notes: newAddress.notes,
          })
          .eq('id', newAddress.id);
          
        if (error) throw error;
        
        setAddresses(addresses.map(addr => 
          addr.id === newAddress.id ? newAddress as Address : addr
        ));
        
        toast({
          title: t("Address updated"),
          description: t("Your address has been updated successfully"),
        });
      } else {
        // Create new address
        const newId = Date.now().toString();
        
        const { error } = await supabase
          .from('addresses')
          .insert([{
            id: newId,
            userId: session.user.id,
            type: newAddress.type,
            street: newAddress.street,
            city: newAddress.city,
            state: newAddress.state,
            zipCode: newAddress.zipCode,
            isDefault: newAddress.isDefault,
            label: newAddress.label,
            notes: newAddress.notes,
          }]);
          
        if (error) throw error;
        
        setAddresses([...addresses, { ...newAddress, id: newId } as Address]);
        
        toast({
          title: t("Address added"),
          description: t("Your address has been added successfully"),
        });
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: t("Error"),
        description: t("Failed to save address. Please try again."),
        variant: "destructive",
      });
    }
  };

  const handleRemoveAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setAddresses(addresses.filter(addr => addr.id !== id));
      
      toast({
        title: t("Address removed"),
        description: t("Your address has been removed successfully"),
      });
    } catch (error) {
      console.error('Error removing address:', error);
      toast({
        title: t("Error"),
        description: t("Failed to remove address. Please try again."),
        variant: "destructive",
      });
    }
  };

  const handleAddSchedule = async () => {
    if (!selectedDay || !selectedTimeSlot) return;
    
    const updatedSchedule = [
      ...deliverySchedule,
      { day: selectedDay, timeSlot: selectedTimeSlot }
    ];
    
    setDeliverySchedule(updatedSchedule);
    setSelectedDay('');
    setSelectedTimeSlot('');
  };

  const handleRemoveScheduleItem = (index: number) => {
    const updatedSchedule = [...deliverySchedule];
    updatedSchedule.splice(index, 1);
    setDeliverySchedule(updatedSchedule);
  };

  const handleSaveSchedule = async () => {
    if (!currentAddress) return;
    
    try {
      const { error } = await supabase
        .from('addresses')
        .update({ frequentDeliveryTimes: deliverySchedule })
        .eq('id', currentAddress.id);
        
      if (error) throw error;
      
      setAddresses(addresses.map(addr => 
        addr.id === currentAddress.id ? {...addr, frequentDeliveryTimes: deliverySchedule} : addr
      ));
      
      setIsScheduleDialogOpen(false);
      
      toast({
        title: t("Schedule saved"),
        description: t("Your delivery schedule preferences have been saved"),
      });
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast({
        title: t("Error"),
        description: t("Failed to save schedule. Please try again."),
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{t("My Addresses")}</h2>
        <Button 
          onClick={handleAddAddress}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t("Add New Address")}
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">{t("No addresses saved yet")}</p>
          <p className="text-gray-400 text-sm mt-1">
            {t("Add an address to save time during checkout")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {address.label || t(address.type)}
                      {address.isDefault && (
                        <Badge variant="outline" className="text-xs">
                          {t("Default")}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {address.type === 'other' ? '' : t(address.type)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{address.street}</p>
                <p className="text-sm">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                {address.notes && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    {t("Note")}: {address.notes}
                  </p>
                )}
                
                {address.frequentDeliveryTimes && address.frequentDeliveryTimes.length > 0 && (
                  <div className="mt-3 border-t pt-2">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t("Preferred delivery times")}:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {address.frequentDeliveryTimes.slice(0, 2).map((schedule, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {t(schedule.day)} {schedule.timeSlot}
                        </Badge>
                      ))}
                      {address.frequentDeliveryTimes.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{address.frequentDeliveryTimes.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex gap-2 text-sm">
                  <Button 
                    onClick={() => handleEditAddress(address)}
                    variant="ghost" 
                    size="sm"
                    className="h-8"
                  >
                    <Edit className="h-4 w-4 mr-1" /> {t("Edit")}
                  </Button>
                  <Button 
                    onClick={() => handleScheduleDelivery(address)}
                    variant="ghost" 
                    size="sm"
                    className="h-8"
                  >
                    <Clock className="h-4 w-4 mr-1" /> {t("Schedule")}
                  </Button>
                  <Button 
                    onClick={() => handleRemoveAddress(address.id)}
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> {t("Remove")}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {newAddress.id ? t("Edit Address") : t("Add New Address")}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  {t("Address Type")}
                </label>
                <Select
                  value={newAddress.type}
                  onValueChange={(value) => 
                    setNewAddress({ ...newAddress, type: value as 'home' | 'work' | 'other' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">{t("Home")}</SelectItem>
                    <SelectItem value="work">{t("Work")}</SelectItem>
                    <SelectItem value="other">{t("Other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  {t("Custom Label")} ({t("optional")})
                </label>
                <Input
                  placeholder={t("e.g. Mom's house")}
                  value={newAddress.label || ''}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("Street Address")}*
              </label>
              <Input
                placeholder={t("123 Main St")}
                value={newAddress.street || ''}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("City")}*
                </label>
                <Input
                  placeholder={t("City")}
                  value={newAddress.city || ''}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {t("State")}*
                </label>
                <Input
                  placeholder={t("State")}
                  value={newAddress.state || ''}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("Postal Code")}*
              </label>
              <Input
                placeholder={t("Postal Code")}
                value={newAddress.zipCode || ''}
                onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("Delivery Notes")} ({t("optional")})
              </label>
              <Textarea
                placeholder={t("Special instructions for delivery")}
                value={newAddress.notes || ''}
                onChange={(e) => setNewAddress({ ...newAddress, notes: e.target.value })}
                className="resize-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="default-address"
                checked={!!newAddress.isDefault}
                onChange={(e) => 
                  setNewAddress({ ...newAddress, isDefault: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="default-address" className="text-sm">
                {t("Set as default address")}
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              {t("Cancel")}
            </Button>
            <Button onClick={handleSubmitAddress}>
              {newAddress.id ? t("Save Changes") : t("Add Address")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delivery Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Set Preferred Delivery Times")}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              {t("Set your preferred delivery times for this address. We'll prioritize these times when scheduling your deliveries.")}
            </p>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  {t("Day")}
                </label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select day")} />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map(day => (
                      <SelectItem key={day} value={day}>{t(day)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  {t("Time Slot")}
                </label>
                <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select time")} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleAddSchedule} 
                  size="icon" 
                  disabled={!selectedDay || !selectedTimeSlot}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md p-3">
              <h4 className="text-sm font-medium mb-2">{t("Your preferred times")}:</h4>
              {deliverySchedule.length === 0 ? (
                <p className="text-sm text-gray-500">{t("No preferred times set")}</p>
              ) : (
                <ul className="space-y-2">
                  {deliverySchedule.map((schedule, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm">
                      <span>{t(schedule.day)}, {schedule.timeSlot}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveScheduleItem(idx)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsScheduleDialogOpen(false)}
            >
              {t("Cancel")}
            </Button>
            <Button onClick={handleSaveSchedule}>
              {t("Save Schedule")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressManager;
