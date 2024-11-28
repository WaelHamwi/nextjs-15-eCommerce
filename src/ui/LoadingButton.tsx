import React from "react";
import { loading } from "@/types/loading";

const LoadingButton: React.FC<loading> = ({
  isLoading,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-to-cart"
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>{" "}
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
