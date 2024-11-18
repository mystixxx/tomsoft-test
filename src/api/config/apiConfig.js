export const API_CONFIG = {
  CORS_PROXY: 'https://thingproxy.freeboard.io/fetch/',
  BASE_URL: 'http://apidemo.luceed.hr/datasnap/rest',
  AUTH: {
    USERNAME: 'luceed_mb',
    PASSWORD: '7e5y2Uza',
  },
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