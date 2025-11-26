import axios from "axios";

const API_URL = "http://localhost:4000";

export class PoolingApiClient {
  async createPool(year: number, ships: string[]) {
    const response = await axios.post(`${API_URL}/pools`, {
      year,
      members: ships.map((id) => ({ shipId: id }))
    });

    return response.data;
  }
}
