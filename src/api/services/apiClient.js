import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

class ApiClient {
  constructor() {
    const authHeader = 'Basic ' + btoa(`${API_CONFIG.AUTH.USERNAME}:${API_CONFIG.AUTH.PASSWORD}`);
    
    this.client = axios.create({
      timeout: 30000,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.initializeInterceptors();
  }

  initializeInterceptors() {
    this.client.interceptors.request.use((config) => {
      if (!config.url.startsWith('http')) {
        const targetUrl = API_CONFIG.BASE_URL + config.url;
        config.url = API_CONFIG.CORS_PROXY + targetUrl;
      }
      return config;
    });

    this.client.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError
    );
  }

  handleResponse(response) {
    return response.data;
  }

  handleResponseError(error) {
    return Promise.reject(error);
  }

  async get(url, params = {}) {
    return this.client.get(url, { params });
  }
}

export const apiClient = new ApiClient(); 