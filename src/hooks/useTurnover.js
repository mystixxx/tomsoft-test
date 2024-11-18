import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../api/services/dashboardService';
import { API_CONFIG } from '../api/config/apiConfig';

export const useTurnover = (type, { selectedWarehouse, startDate, endDate }, enabled = false) => {
  const queryFn = type === 'articles' 
    ? () => dashboardService.getTurnoverArticles({ selectedWarehouse, startDate, endDate })
    : () => dashboardService.getTurnoverPaymentMethods({ selectedWarehouse, startDate, endDate });

  return useQuery({
    queryKey: [`turnover-${type}`, selectedWarehouse, startDate, endDate],
    queryFn,
    enabled: enabled && !!selectedWarehouse && !!startDate,
    staleTime: API_CONFIG.CACHE_TIME.SHORT,
    cacheTime: API_CONFIG.CACHE_TIME.MEDIUM,
    select: (data) => data?.result?.[0]?.[`obracun_${type === 'articles' ? 'artikli' : 'placanja'}`] || []
  });
}; 