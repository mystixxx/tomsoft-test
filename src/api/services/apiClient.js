import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL
    });

    this.initializeInterceptors();
  }

  initializeInterceptors() {
    this.client.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    );

    this.client.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError
    );
  }

  async handleRequest(config) {
    try {
      const auth = {
        username: process.env.REACT_APP_API_USERNAME,
        password: process.env.REACT_APP_API_PASSWORD
      };
      
      const basicAuth = btoa(`${auth.username}:${auth.password}`);
      config.headers.Authorization = `Basic ${basicAuth}`;
      return config;
    } catch (error) {
      console.error('Authentication error:', error);
      return Promise.reject(error);
    }
  }

  handleRequestError(error) {
    return Promise.reject(error);
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