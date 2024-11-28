import React from "react";

interface ProductSkeletonProps {
  count: number;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count }) => {
  return (
    <div className="container">
      {" "}
      <div className="row clearfix">
        {Array.from({ length: count }).map((_, index) => (
          <div className="col-md-3 prdct-grid" key={index}>
            <div className="product-fade-skelton">
              <div className="product-fade-skelton-wrap">
                <div className="skeleton-image" />
                <div className="product-fade-skelton-ct">
                  <div className="product-fade-skelton-control">
                    <div className="to-left">
                      <div className="skeleton-icon" />
                      <div className="skeleton-icon" />
                      <div className="skeleton-icon" />
                    </div>
                    <div className="to-right">
                      <div className="skeleton-bullet" />
                      <div className="skeleton-bullet" />
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skeleton-text skeleton-name" />
            <div className="skeleton-text skeleton-price" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeleton;
