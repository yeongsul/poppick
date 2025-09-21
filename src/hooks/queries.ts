import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/src/lib/api';

export const useProducts = () =>
  useQuery({ queryKey: ['products'], queryFn: api.getProducts });

export const useProduct = (id: string | undefined) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id as string),
    enabled: !!id,
  });

export const useTimeslots = (productId: string | undefined) =>
  useQuery({
    queryKey: ['slots', productId],
    queryFn: () => api.getTimeslots(productId as string),
    enabled: !!productId,
  });

export const useOrders = () =>
  useQuery({ queryKey: ['orders'], queryFn: api.getOrders });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useEventCategories = () =>
  useQuery({ queryKey: ['event-categories'], queryFn: api.getEventCategories });

export const usePopupStores = () =>
  useQuery({ queryKey: ['popup-stores'], queryFn: api.getPopupStores });

export const usePopupStore = (id: string | undefined) =>
  useQuery({
    queryKey: ['popup-store', id],
    queryFn: () => api.getPopupStore(id as string),
    enabled: !!id,
  });

export const useStoreProducts = (storeId: string | undefined) =>
  useQuery({
    queryKey: ['store-products', storeId],
    queryFn: () => api.getStoreProducts(storeId as string),
    enabled: !!storeId,
  });
