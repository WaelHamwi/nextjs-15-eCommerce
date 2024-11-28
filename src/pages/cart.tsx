import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import CartItemList from "@/components/CartItemList";
import { useCartHelper } from "@/utils/useCartHelper";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useRouter } from "next/router";
import CartSummary from "@/components/CartSummary";

const ShoppingCart: React.FC = () => {
  const {
    cartItems,
    loadingProductId,
    handleAddToCart,
    handleRemoveFromCart,
    loading,
    products,
    calculateTotalPrice,
  } = useCartHelper();

  const router = useRouter();

  const handleBackToShop = () => {
    router.push("/");
  };

  if (loading) {
    return <div>Loading products...</div>;
  }



  return (
    <>
      <Header />
      <div className="cart-body">
        <div className="cart-container">
          <div className="cart">
            <div className="title">
              <h4>
                <b>Shopping Cart</b>
              </h4>
              <div className="text-right text-muted">
                {Object.entries(cartItems).length} items
              </div>
            </div>

            {Object.entries(cartItems).length > 0 ? (
              <CartItemList
                cartItems={cartItems}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                loadingProductId={loadingProductId}
              />
            ) : (
              <div className="empty-cart-message">
                <p>Your cart is empty!</p>
                <div className="back-to-shop">
                  <button className="btn" onClick={handleBackToShop}>
                    Back to shop
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pass props to CartSummary */}
          <CartSummary
            cartItems={cartItems}
            calculateTotalPrice={calculateTotalPrice}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
