import React, { useEffect } from "react";
import { fetchProducts } from "@/store/products/asyncActions";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppSelector";
import ProductList from "@/components/ProductList";
import SkeletonWrapper from "@/ui/SkeletonWrapper";
import ProductSkeleton from "@/ui/ProductSkeleton";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error, productCount } = useAppSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (!products.length && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading]);

  return (
    <div>
      <SkeletonWrapper
        loading={loading}
        count={productCount === 0 ? 8 : productCount}
        SkeletonComponent={ProductSkeleton}
        error={error}
      >
        <ProductList products={products} />
      </SkeletonWrapper>
    </div>
  );
};

export default ProductsPage;
