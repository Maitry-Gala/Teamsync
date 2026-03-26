import { getCurrentUserQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";

const useAuth = () => {
  const token = useStore((state) => state.accessToken);
  const hasHydrated = useStore((state) => state._hasHydrated);

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
    retry: false,
    enabled: hasHydrated && !!token,
  });
  const isLoading = !hasHydrated || (hasHydrated && !!token && query.isLoading);

  return  { ...query, isLoading,isPending: isLoading};
};

export default useAuth;
