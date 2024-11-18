import { apiClient } from './apiClient';
import { API_CONFIG } from '../config/apiConfig';
import { formatDate } from '../../utils';

export const dashboardService = {
  getArticles: async (search = '') => {
    const url = `${API_CONFIG.ENDPOINTS.ARTICLES}${search}`;
    return apiClient.get(url);
  },

  getWarehouses: async () => {
    return apiClient.get(API_CONFIG.ENDPOINTS.WAREHOUSES);
  },

  getTurnoverArticles: async ({ selectedWarehouse, startDate, endDate }) => {
    const url = `${API_CONFIG.ENDPOINTS.TURNOVER.ARTICLES}${selectedWarehouse}/${formatDate(startDate)}/${formatDate(endDate)}`;
    return apiClient.get(url);
  },

  getTurnoverPaymentMethods: async ({ selectedWarehouse, startDate, endDate }) => {
    const url = `${API_CONFIG.ENDPOINTS.TURNOVER.PAYMENT_METHODS}${selectedWarehouse}/${formatDate(startDate)}/${formatDate(endDate)}`;
    return apiClient.get(url);
  }
}; 