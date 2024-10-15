import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface Stock {
  symbol: string;
  name: string;
  latestPrice: number;
  percentChange: number;
}

class StockStore {
  // List of all available stocks type Stock
  allStocks: Stock[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch all stocks from the API
  async fetchAllStocks() {
    const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;

    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=${apiKey}`
      );

      ////map the response data to the allStocks array structure
      const results = response.data.map((stock: any) => ({
        symbol: stock.symbol,
        name: stock.name,
        latestPrice: stock.price,
        percentChange: stock.changesPercentage,
      }));

      this.allStocks = results;
    } catch (error) {
      console.error("Failed to fetch all stocks", error);
    }
  }
}

const stockStore = new StockStore();
export default stockStore;
