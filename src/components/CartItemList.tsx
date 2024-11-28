import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCartHelper } from "@/utils/useCartHelper";
import LoadingButton from "@/ui/LoadingButton";
import { selectProductsInCart } from "@/selectors/cartSelectors"; // Adjust the import based on your selectors file

interface CartItemListProps {
  cartItems: { [id: string]: number };
}

const CartItemList: React.FC<CartItemListProps> = ({ cartItems }) => {
  
  const dispatch = useDispatch();

  
  const productsInCart = useSelector(selectProductsInCart); 

  const {
    handleAddToCartWithLoader,
    handleDecreaseFromCart,
    handleRemoveItem,
    isButtonDisabled,
    truncateDescription,
    loadingProductId,
  } = useCartHelper();
  console.log(isButtonDisabled);

  return (
    <>
      {productsInCart.map((product) => {
        const { id, quantity, name, image, price, description } = product;

        return (
          <div key={id} className="product-item">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt={name}
            />
            <div className="product-info">
              <div className="product-name">{name}</div>
              <div className="product-price">{price}</div>
              <div className="product-description">
                {truncateDescription(description, 8)}
              </div>
              <div className="quantity-container">
                <LoadingButton
                  isLoading={loadingProductId === id}
                  onClick={() => handleDecreaseFromCart(id)}
                >
                  <button>-</button>
                </LoadingButton>
                <input type="number" value={quantity} min="0" readOnly />
                <LoadingButton
                  isLoading={loadingProductId === id}
                  onClick={() => handleAddToCartWithLoader(id)}
                  disabled={isButtonDisabled(id)}
                >
                  <button disabled={isButtonDisabled(id)}>
                    {!isButtonDisabled(id) ? "+" : "Not enough"}
                  </button>
                </LoadingButton>
              </div>
            </div>
            <div
              className="remove-item"
              onClick={() => handleRemoveItem(id)}
            >
              &#10005;
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartItemList;
