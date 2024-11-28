import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { createOrder } from "@/store/orders/asyncActions";
import { clearCart } from "@/store/carts/slice";
import { selectProductsInCart } from "@/selectors/cartSelectors";
import { CartSummaryProps } from "@/types/CartSummary";
import { fetchUser } from "@/store/users/slice";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "@/components/ConfirmationModal";

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  calculateTotalPrice,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const productsInCart = useSelector(selectProductsInCart);
  const { user } = useSelector((state: RootState) => state.user);

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleCheckout = async () => {
    const orderDetails = Object.entries(cartItems)
      .map(([id, quantity]) => {
        const product = productsInCart.find((p) => p.id === Number(id));
        if (!product) return null;
        return { productId: product.id, quantity };
      })
      .filter(Boolean);

    const total = Number(calculateTotalPrice());
    if (!user?.id) {
      console.error("User ID is missing. Cannot proceed with checkout.");
      return;
    }

    const order = {
      userId: user?.id,
      total: total,
      createdAt: new Date().toISOString(),
    };

    try {
      if (orderDetails.length < 1) {
        toast.error("Failed to create the order. Please try again.", {
          type: "error",
        });
        return;
      }
      const result = await dispatch(
        createOrder({ order, orderDetails })
      ).unwrap();
  
      dispatch(clearCart());
      toast.success("Order placed successfully. Redirecting to your orders...");

      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to create the order. Please try again.", {
        type: "error",
      });
    }
  };

  const handleProceed = () => {
    setShowModal(true);
  };

  const handleConfirmCheckout = () => {
    setShowModal(false);
    handleCheckout();
  };

  const handleCancelCheckout = () => {
    setShowModal(false);
  };

  return (
    <div className="summary">
      <h5>
        <b>Summary</b>
      </h5>
      <div className="divider"></div>

      {Object.entries(cartItems).map(([id, quantity]) => {
        const product = productsInCart.find((p) => p.id === Number(id));
        if (!product) return null;
        const totalProductPrice = (product.price * quantity).toFixed(2);

        return (
          <React.Fragment key={id}>
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div
                className="summary-item mb-4 p-5 border rounded-lg shadow-sm text-center"
                style={{ maxWidth: "600px", width: "100%" }}
              >
                <div className="mb-3">
                  <span className="h3 font-weight-bold text-dark">
                    {product.name}
                  </span>
                </div>

                <div className="border-bottom mb-4"></div>

                <div className="d-flex justify-content-center align-items-center">
                  <span className="h5 text-muted mr-3">
                    {quantity} x €{product.price.toFixed(2)}
                  </span>
                  <span className="h5 text-primary font-weight-bold ml-3">
                    = €{totalProductPrice}
                  </span>
                </div>
              </div>
            </div>
            <div className="divider"></div>
          </React.Fragment>
        );
      })}

      <div className="total-price">
        <b>Total: € {calculateTotalPrice()}</b>
      </div>

      <button className="btn-proceed" onClick={handleProceed}>
        Proceed to Checkout
      </button>

      <ConfirmationModal
        showModal={showModal}
        onConfirm={handleConfirmCheckout}
        onCancel={handleCancelCheckout}
        message="Are you sure you want to proceed with the checkout?"
      />

      <ToastContainer />
    </div>
  );
};

export default CartSummary;
