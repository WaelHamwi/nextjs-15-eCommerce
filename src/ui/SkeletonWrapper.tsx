import React from "react";
import { SkeletonWrapperProps } from "@/types/SkeletonWrapper";

function SkeletonWrapper<T>({
  loading,
  children,
  count,
  SkeletonComponent,
  error,
}: SkeletonWrapperProps<T>): JSX.Element {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <SkeletonComponent count={count} />;
  }

  return <>{children}</>;
}

export default SkeletonWrapper;
