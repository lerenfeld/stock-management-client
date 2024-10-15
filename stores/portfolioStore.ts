import { makeAutoObservable } from "mobx";
import axios from "axios";
import { Stock } from "./stockStore";

class PortfolioStore {
  userId = "user123"; // Example user ID
  userStocks = [
    {
      symbol: "AAPL",
      name: "Apple",
      latestPrice: 150,
      percentChange: 0.5,
    },
    {
      symbol: "GOOG",
      name: "Google",
      latestPrice: 2800,
      percentChange: -0.2,
    },
  ];
  currentStock: Stock | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch the user's portfolio
  async fetchUserPortfolio() {
    try {
      const response = await axios.get(
        `http://localhost:5000/portfolio/${this.userId}`
      );
      this.userStocks = response.data.stocks;
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
    }
  }

  // Add a stock to the user's portfolio
  async addStockToPortfolio(stock: Stock) {
    try {
      await axios.post(
        `http://localhost:5000/portfolio/${this.userId}/add-stock`,
        stock
      );
      this.userStocks.push(stock); // Update local state
    } catch (error) {
      console.error("Failed to add stock", error);
    }
  }

  // Remove a stock from the user's portfolio
  async removeStockFromPortfolio(symbol: string) {
    try {
      await axios.delete(
        `http://localhost:5000/portfolio/${this.userId}/remove-stock/${symbol}`
      );
      this.userStocks = this.userStocks.filter(
        (stock) => stock.symbol !== symbol
      );
    } catch (error) {
      console.error("Failed to remove stock", error);
    }
  }

  // Fetch a specific stock by symbol
  async fetchCurrentStock(symbol: string) {
    const apiKey = process.env.NEXT_PUBLIC_FINANCIAL_MODELING_PREP_API_KEY;

    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
      );

      const stockData = response.data[0];

      const stock: Stock = {
        symbol: stockData.symbol,
        name: stockData.name || stockData.companyName, // In case the name is stored as 'companyName'
        latestPrice: stockData.price,
        percentChange: stockData.changesPercentage,
      };

      return stock;
    } catch (error) {
      console.error("Failed to fetch stock", error);
    }
  }
}

const portfolioStore = new PortfolioStore();
export default portfolioStore;
