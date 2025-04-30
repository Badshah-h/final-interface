/**
 * Custom hook for API calls with loading and error states
 */
import { useState, useCallback } from "react";
import { ApiError } from "@/services/api/base";

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error | ApiError) => void;
}

export function useApi<T, P extends any[]>(
  apiFunction: (...args: P) => Promise<T>,
  options: UseApiOptions = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | ApiError | null>(null);

  const execute = useCallback(
    async (...args: P) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...args);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
        options.onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, options],
  );

  return {
    data,
    isLoading,
    error,
    execute,
  };
}
