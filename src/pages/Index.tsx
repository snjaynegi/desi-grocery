
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { dummyProducts } from "../data/products";

const Index = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = dummyProducts.filter((product) =>
    t(product.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ProductGrid products={filteredProducts} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
