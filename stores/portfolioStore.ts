// stores/portfolioStore.ts
import { makeAutoObservable } from "mobx";

interface Stock {
  symbol: string;
  name: string;
  latestPrice: number;
  percentChange: number;
}

class PortfolioStore {
  stocks = [
    { symbol: "AAPL", name: "Apple", latestPrice: 150, percentChange: 0.5 },
    { symbol: "GOOG", name: "Google", latestPrice: 2800, percentChange: -0.2 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }

  removeStock(symbol: string) {
    this.stocks = this.stocks.filter((stock) => stock.symbol !== symbol);
  }
}

const portfolioStore = new PortfolioStore();
export default portfolioStore;
