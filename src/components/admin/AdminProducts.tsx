
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Edit, Trash2, Plus, Check, X } from "lucide-react";
import { extendedProducts } from "@/data/products";

// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  quantity: number;
}

const AdminProducts = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<"stock" | "delete" | null>(null);

  // Form state
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    description: "",
    category: "staples",
    image: "",
    inStock: true,
    quantity: 0
  });

  // Initialize products from extendedProducts
  useEffect(() => {
    // Convert extendedProducts to our Product structure
    const formattedProducts = extendedProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      inStock: product.inStock,
      quantity: Math.floor(Math.random() * 100) + 1 // Random quantity for demo
    }));
    setProducts(formattedProducts);
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = [...products];
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  // Handle product selection
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Select all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  // Add product
  const handleAddProduct = () => {
    const newProduct = {
      ...currentProduct,
      id: Date.now().toString()
    };
    
    setProducts(prev => [...prev, newProduct]);
    setCurrentProduct({
      id: "",
      name: "",
      price: 0,
      description: "",
      category: "staples",
      image: "",
      inStock: true,
      quantity: 0
    });
    
    setIsAddDialogOpen(false);
    toast({
      title: t("Product Added"),
      description: t("The product has been added successfully")
    });
  };

  // Edit product
  const handleEditProduct = () => {
    setProducts(prev => prev.map(p => 
      p.id === currentProduct.id ? currentProduct : p
    ));
    
    setIsEditDialogOpen(false);
    toast({
      title: t("Product Updated"),
      description: t("The product has been updated successfully")
    });
  };

  // Delete product
  const handleDeleteProduct = () => {
    setProducts(prev => prev.filter(p => p.id !== currentProduct.id));
    
    setIsDeleteDialogOpen(false);
    toast({
      title: t("Product Deleted"),
      description: t("The product has been deleted successfully")
    });
  };

  // Handle bulk actions
  const executeBulkAction = () => {
    if (bulkAction === "stock") {
      setProducts(prev => prev.map(p => 
        selectedProducts.includes(p.id) ? { ...p, inStock: !p.inStock } : p
      ));
      toast({
        title: t("Stock Updated"),
        description: t("Stock status has been updated for selected products")
      });
    } else if (bulkAction === "delete") {
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
      toast({
        title: t("Products Deleted"),
        description: t("Selected products have been deleted")
      });
    }
    
    setSelectedProducts([]);
    setIsBulkActionDialogOpen(false);
    setBulkAction(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold">{t("Product Inventory Management")}</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            {t("Add Product")}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search products...")}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder={t("All Categories")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All Categories")}</SelectItem>
                <SelectItem value="staples">{t("Staples")}</SelectItem>
                <SelectItem value="fruits">{t("Fruits")}</SelectItem>
                <SelectItem value="vegetables">{t("Vegetables")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="flex gap-2 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setBulkAction("stock");
                setIsBulkActionDialogOpen(true);
              }}
            >
              {t("Toggle Stock Status")}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                setBulkAction("delete");
                setIsBulkActionDialogOpen(true);
              }}
            >
              {t("Delete Selected")}
            </Button>
          </div>
        )}

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length} 
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all products"
                  />
                </TableHead>
                <TableHead>{t("Name")}</TableHead>
                <TableHead>{t("Category")}</TableHead>
                <TableHead>{t("Price")}</TableHead>
                <TableHead>{t("Quantity")}</TableHead>
                <TableHead>{t("Stock Status")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">{t("No products found")}</TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)} 
                        onCheckedChange={() => toggleProductSelection(product.id)}
                        aria-label={`Select ${product.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {product.image && (
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <div>{t(product.name)}</div>
                          <div className="text-xs text-gray-500">{product.description.substring(0, 20)}...</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{t(product.category)}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span>{product.inStock ? t("In Stock") : t("Out of Stock")}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Add New Product")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Product Name")}
              </label>
              <Input
                id="name"
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                placeholder={t("Enter product name")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t("Price")}
                </label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t("Quantity")}
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={currentProduct.quantity}
                  onChange={(e) => setCurrentProduct({...currentProduct, quantity: parseInt(e.target.value)})}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Category")}
              </label>
              <Select 
                value={currentProduct.category} 
                onValueChange={(value) => setCurrentProduct({...currentProduct, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder={t("Select category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staples">{t("Staples")}</SelectItem>
                  <SelectItem value="fruits">{t("Fruits")}</SelectItem>
                  <SelectItem value="vegetables">{t("Vegetables")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Description")}
              </label>
              <Input
                id="description"
                value={currentProduct.description}
                onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                placeholder={t("Enter product description")}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Image URL")}
              </label>
              <Input
                id="image"
                value={currentProduct.image}
                onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                placeholder={t("Enter image URL")}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="inStock" 
                checked={currentProduct.inStock}
                onCheckedChange={(checked) => 
                  setCurrentProduct({...currentProduct, inStock: Boolean(checked)})
                }
              />
              <label
                htmlFor="inStock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("In Stock")}
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleAddProduct}>{t("Add Product")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Edit Product")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Product Name")}
              </label>
              <Input
                id="edit-name"
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-price" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t("Price")}
                </label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-quantity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t("Quantity")}
                </label>
                <Input
                  id="edit-quantity"
                  type="number"
                  min="0"
                  value={currentProduct.quantity}
                  onChange={(e) => setCurrentProduct({...currentProduct, quantity: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Category")}
              </label>
              <Select 
                value={currentProduct.category} 
                onValueChange={(value) => setCurrentProduct({...currentProduct, category: value})}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder={t("Select category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staples">{t("Staples")}</SelectItem>
                  <SelectItem value="fruits">{t("Fruits")}</SelectItem>
                  <SelectItem value="vegetables">{t("Vegetables")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Description")}
              </label>
              <Input
                id="edit-description"
                value={currentProduct.description}
                onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t("Image URL")}
              </label>
              <Input
                id="edit-image"
                value={currentProduct.image}
                onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="edit-inStock" 
                checked={currentProduct.inStock}
                onCheckedChange={(checked) => 
                  setCurrentProduct({...currentProduct, inStock: Boolean(checked)})
                }
              />
              <label
                htmlFor="edit-inStock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("In Stock")}
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleEditProduct}>{t("Update Product")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Delete Product")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to delete this product? This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
              {t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Action Confirmation Dialog */}
      <AlertDialog open={isBulkActionDialogOpen} onOpenChange={setIsBulkActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bulkAction === "stock" ? t("Update Stock Status") : t("Delete Products")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bulkAction === "stock" 
                ? t("Are you sure you want to toggle the stock status for the selected products?")
                : t("Are you sure you want to delete the selected products? This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeBulkAction} 
              className={bulkAction === "delete" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {bulkAction === "stock" ? t("Update") : t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;
