import axios from "axios";
import { ApiService } from "@/services/api.service";

export class AuthService extends ApiService {
  constructor(path) {
    super();
    this.path = path;
  }

  setAuthHeader(token) {
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  login(params) {
    return this.$post(`${this.path}/login`, params);
  }

  logout() {
    return this.$delete(`${this.path}/logout`);
  }

  whoAmI() {
    return this.$get(`${this.path}/whoAmI`);
  }
}
