// src/services/AuthApi.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";

class WalletApi {
  static async register(data) {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
  }

  static async login(data) {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    return res.data;
  }
}

export default WalletApi;
