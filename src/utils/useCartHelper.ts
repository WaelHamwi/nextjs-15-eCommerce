import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart, removeFromCart, updateQuantity } from "@/store/carts/slice";
import { RootState } from "@/store";
import { selectProductsInCart } from "@/selectors/cartSelectors";

export const useCartHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productsState = useSelector((state: RootState) => state.products);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const productsInCart = useSelector(selectProductsInCart);
  
  const calculateTotalPrice = () => {
    return Object.entries(cartItems)
      .reduce((total, [id, quantity]) => {
        const product = productsInCart.find((p) => p.id === Number(id));
        if (product) {
          const totalProductPrice = product.price * quantity;
          return total + totalProductPrice; // Sum up the total price
        }
        return total;
      }, 0)
      .toFixed(2); // Ensure the result is a string with 2 decimals
  };

  const handleAddToCart = useCallback(
    (id: string) => {
      const currentQuantity = cartItems[id] || 0;
      dispatch(
        addToCart({
          id,
          quantity: 1,
          product: productsState.products.find((p) => p.id === id)!,
        })
      );
    },
    [dispatch, cartItems]
  );

  const handleAddToCartWithLoader = useCallback(
    (id: string) => {
      setLoadingProductId(id);
      setTimeout(() => {
        handleAddToCart(id);
        setLoadingProductId(null);
      }, 300);
    },
    [handleAddToCart]
  );

  //remove items from cart list
  const handleRemoveFromCart = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );
  const handleDecreaseFromCart = useCallback(
    (id: string) => {
      const currentQuantity = cartItems[id] || 0;
      if (currentQuantity > 1) {
        dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
      } else if (currentQuantity === 1) {
        handleRemoveFromCart(id);
      }
    },
    [dispatch, cartItems, handleRemoveFromCart]
  );

  const getCurrentQuantity = useCallback(
    (productId: string) => cartItems[productId] || 0,
    [cartItems]
  );

  const isProductOutOfStock = useCallback(
    (productId: string) => {
      const product = productsState.products.find((p) => p.id === productId);
      return product ? product.stock === 0 : true;
    },
    [productsState]
  );

  const isButtonDisabled = useCallback(
    (productId: string) => {
      const product = productsInCart.find((p) => p.id === productId);
      const currentQuantity = cartItems[productId] || 0;
      return product ? product.stock - currentQuantity <= 0 : true;
    },
    [cartItems, productsInCart]
  );

  const isButtonProductsDisabled = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      const currentQuantity = cartItems[productId] || 0;
      return product ? product.stock - currentQuantity <= 0 : true;
    },
    [cartItems, products]
  );


  const handleRemoveItem = (id: string) => {
    handleRemoveFromCart(id);
  };

  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };
  

  return {
    handleAddToCart,
    handleAddToCartWithLoader,
    getCurrentQuantity,
    loadingProductId,
    isProductOutOfStock,
    isButtonDisabled,
    cartItems,
    products,
    loading,
    calculateTotalPrice,
    handleDecreaseFromCart,
    handleRemoveItem,
    truncateDescription,
    isButtonProductsDisabled
  };
};
