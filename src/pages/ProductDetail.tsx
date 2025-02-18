import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { toast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { dispatch } = useCart();

  // For demo purposes, we'll use the same product data
  // In a real application, this would come from an API
  const dummyProducts = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 40,
      image: "https://images.unsplash.com/photo-1546470427-701d9e4d7b1f",
      category: "vegetables",
    },
    {
      id: "2",
      name: "Organic Onions",
      price: 35,
      image: "https://images.unsplash.com/photo-1508747703725-719777637510",
      category: "vegetables",
    },
    {
      id: "3",
      name: "Basmati Rice",
      price: 120,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      category: "staples",
    },
    {
      id: "4",
      name: "Fresh Apples",
      price: 180,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
      category: "fruits",
    },
    {
      id: "5",
      name: "Organic Bananas",
      price: 60,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
      category: "fruits",
    },
    {
      id: "6",
      name: "Green Chilies",
      price: 20,
      image: "https://images.unsplash.com/photo-1588891557811-5f9464cf4c72",
      category: "vegetables",
    },
    {
      id: "7",
      name: "Fresh Carrots",
      price: 45,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
      category: "vegetables",
    },
    {
      id: "8",
      name: "Organic Potatoes",
      price: 50,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      category: "vegetables",
    },
    {
      id: "9",
      name: "Fresh Mangoes",
      price: 200,
      image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
      category: "fruits",
    },
    {
      id: "10",
      name: "Organic Dal",
      price: 140,
      image: "https://images.unsplash.com/photo-1585996177123-8bbfa0449388",
      category: "staples",
    },
    {
      id: "11",
      name: "Fresh Coconut",
      price: 45,
      image: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb",
      category: "vegetables",
    },
    {
      id: "12",
      name: "Bell Peppers",
      price: 85,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
      category: "vegetables",
    }
  ];

  const product = dummyProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Product not found")}
        </h1>
        <Link
          to="/"
          className="text-primary hover:text-primary/90 transition-colors"
        >
          {t("Back to Home")}
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
    toast({
      title: t("Item added to cart"),
      description: t(product.name),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("Back to Home")}
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={t(product.name)}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                {t(product.category)}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {t(product.name)}
              </h1>
              <p className="mt-4 text-2xl text-gray-900">₹{product.price}</p>
              <button
                onClick={handleAddToCart}
                className="mt-8 w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t("Add to Cart")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
