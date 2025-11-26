import axios from "axios";

const API_URL = "http://localhost:4000";

export class BankingApiClient {
  async computeCB(shipId: string, year: number, actualIntensity: number, fuelConsumption: number) {
    const response = await axios.get(`${API_URL}/compliance/cb`, {
      params: { shipId, year, actualIntensity, fuelConsumption },
    });
    return response.data;
  }

  async bankSurplus(shipId: string, year: number) {
    const response = await axios.post(`${API_URL}/banking/bank`, {
      shipId,
      year,
    });
    return response.data;
  }

  async applyBanked(shipId: string, year: number, amount: number) {
    const response = await axios.post(`${API_URL}/banking/apply`, {
      shipId,
      year,
      amount,
    });
    return response.data;
  }

  async getBankRecords(shipId: string, year: number) {
    const response = await axios.get(`${API_URL}/banking/records`, {
      params: { shipId, year },
    });
    return response.data;
  }
}
