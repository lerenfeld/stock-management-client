"use client";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import portfolioStore from "@/stores/portfolioStore";
import { Stock } from "@/stores/stockStore";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons"; // Optional: Use Ant Design icon for arrow
import { Button } from "antd"; // Import Ant Design Button

const StockDetails = ({ params }: any) => {
  const symbol = params.symbol; // Get the stock symbol from the route
  const [stock, setStock] = useState<Stock>();
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    // Fetch stock details
    handleFetchStock();
  }, [symbol]);

  const handleFetchStock = async () => {
    const stock = await portfolioStore.fetchCurrentStock(symbol);
    setStock(stock);
  };

  const handleAddToPortfolio = () => {
    if (stock) {
      portfolioStore.addStockToPortfolio(stock); // Add the full stock object
    }
  };

  const handleRemoveFromPortfolio = () => {
    portfolioStore.removeStockFromPortfolio(symbol); // Remove using the stock symbol
  };

  // Check if the stock is in the user's portfolio
  const isInPortfolio = portfolioStore.userStocks.some(
    (userStock: Stock) => userStock.symbol === symbol
  );

  return (
    <div className='flex flex-col'>
      {/* Back Arrow */}
      <div className='flex items-center mb-4'>
        <button
          onClick={() => router.back()}
          className='text-gray-500 hover:text-gray-800 flex items-center'
        >
          {/* Optional: Ant Design back arrow icon */}
          <ArrowLeftOutlined className='mr-2' />
          <span>Back</span>
        </button>
      </div>
      <div className='p-6 bg-white shadow-md rounded-lg max-w-lg'>
        <h1 className='text-3xl font-semibold mb-6 text-primary'>
          Stock Details - {symbol}
        </h1>

        {stock && (
          <div className='space-y-4 text-primary'>
            <p className='text-lg'>
              <span className='font-medium text-gray-600'>Symbol:</span>{" "}
              {stock.symbol}
            </p>
            <p className='text-lg'>
              <span className='font-medium text-gray-600'>Name:</span>{" "}
              {stock.name}
            </p>
            <p className='text-lg'>
              <span className='font-medium text-gray-600'>Latest Price:</span> $
              {stock.latestPrice}
            </p>
            <p className='text-lg'>
              <span className='font-medium text-gray-600'>Percent Change:</span>{" "}
              <span
                className={`font-bold ${
                  stock.percentChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {stock.percentChange}%
              </span>
            </p>

            {/* Add and Remove Portfolio Buttons */}
            <div className='flex space-x-4 mt-6'>
              {!isInPortfolio ? (
                <Button
                  type='primary'
                  onClick={handleAddToPortfolio}
                  className='bg-blue-600 hover:bg-blue-500'
                >
                  Add to Portfolio
                </Button>
              ) : (
                <Button
                  type='default'
                  onClick={handleRemoveFromPortfolio}
                  className='bg-red-600 hover:bg-red-500 text-white'
                >
                  Remove from Portfolio
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDetails;
