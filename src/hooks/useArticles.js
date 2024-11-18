import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../api/services/dashboardService';
import { API_CONFIG } from '../api/config/apiConfig';

export const useArticles = (search) => {
  return useQuery({
    queryKey: ['articles', search],
    queryFn: () => dashboardService.getArticles(search),
    staleTime: API_CONFIG.CACHE_TIME.SHORT,
    cacheTime: API_CONFIG.CACHE_TIME.MEDIUM,
    select: (data) => data?.result?.[0]?.artikli || []
  });
}; 