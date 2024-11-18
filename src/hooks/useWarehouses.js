import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../api/services/dashboardService';
import { API_CONFIG } from '../api/config/apiConfig';

export const useWarehouses = () => {
  return useQuery({
    queryKey: ['warehouses'],
    queryFn: dashboardService.getWarehouses,
    staleTime: API_CONFIG.CACHE_TIME.SHORT,
    cacheTime: API_CONFIG.CACHE_TIME.MEDIUM,
    select: (data) => 
      data?.result?.[0]?.skladista?.map(warehouse => ({
        value: warehouse.pj_uid,
        label: warehouse.naziv,
      })) || []
  });
}; 