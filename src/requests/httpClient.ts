import axios, { AxiosRequestConfig } from 'axios';

class ApiClient {
  private static instance: ApiClient;
  private token: string | null = localStorage.getItem('token');


  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    this.setToken(localStorage.getItem('token'))

    if (this.token) {
      config.headers = {
        Authorization: `Bearer ${this.token}`,
        ...config.headers,
      };
    }
    try {
      const response = await axios(config);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }
}

export default ApiClient;
