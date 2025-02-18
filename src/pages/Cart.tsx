
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Your cart is empty")}
        </h2>
        <p className="text-gray-600 mb-8">{t("Add some items to get started")}</p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t("Continue Shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("Cart")}</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-4 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {t(item.name)}
                    </h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x">{item.quantity}</span>
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: item.id })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    {t("Remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{t("Total")}</span>
              <span className="text-2xl font-bold">₹{state.total}</span>
            </div>
            <button className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              {t("Proceed to Checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
