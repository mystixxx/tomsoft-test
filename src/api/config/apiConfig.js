export const API_CONFIG = {
  BASE_URL: 'http://apidemo.luceed.hr/datasnap/rest',
  ENDPOINTS: {
    ARTICLES: '/artikli/naziv/',
    WAREHOUSES: '/skladista/lista',
    TURNOVER: {
      ARTICLES: '/mpobracun/artikli/',
      PAYMENT_METHODS: '/mpobracun/placanja/',
    }
  },
  CACHE_TIME: {
    SHORT: 5 * 60 * 1000, // 5 minuta
    MEDIUM: 30 * 60 * 1000 // 30 minuta
  }
}; 