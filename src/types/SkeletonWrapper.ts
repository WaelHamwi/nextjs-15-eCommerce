export interface SkeletonWrapperProps<T> {
    loading: boolean;
    children: React.ReactNode;
    count: number;
    SkeletonComponent: React.ComponentType<{ count: number }>;
    error?: string | null;
  }
  