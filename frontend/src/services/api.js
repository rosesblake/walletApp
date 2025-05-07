// src/services/AuthApi.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";

axios.defaults.withCredentials = true;

class WalletApi {
  static async register(data) {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
  }

  static async login(data) {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    return res.data;
  }

  static async logout() {
    return await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  static async getBalance() {
    const res = await axios.get(`${BASE_URL}/dashboard`, {
      withCredentials: true,
    });
    return res.data;
  }

  static async getTransactions() {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      withCredentials: true,
    });
    return res.data;
  }

  static async getMe() {
    const res = await axios.get(`${BASE_URL}/auth/me`, {
      withCredentials: true,
    });
    return res.data;
  }

  static async deposit(data) {
    const res = await axios.post(`${BASE_URL}/deposit`, data, {
      withCredentials: true,
    });
    return res.data;
  }
}

export default WalletApi;
