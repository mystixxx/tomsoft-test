export const API_CONFIG = {
  CORS_PROXY: 'https://thingproxy.freeboard.io/fetch/',
  BASE_URL: 'http://apidemo.luceed.hr/datasnap/rest',
  AUTH: {
    USERNAME: process.env.REACT_APP_API_USERNAME,
    PASSWORD: process.env.REACT_APP_API_PASSWORD,
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