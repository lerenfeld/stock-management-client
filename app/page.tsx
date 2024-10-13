"use client"; // Use client-side rendering

import { observer } from "mobx-react-lite";
import { Table } from "antd"; // Import Table from Ant Design
import portfolioStore from "@/stores/portfolioStore";
import LookupInput from "@/components/LookupInput";

const Portfolio = observer(() => {
  // Define the columns for Ant Design's Table component
  const columns = [
    {
      title: "Stock",
      dataIndex: "name", // Accessing the 'name' field in the stock data
      key: "name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Latest Price",
      dataIndex: "latestPrice",
      key: "latestPrice",
      render: (price: number) => `$${price.toFixed(2)}`, // Formatting the price as currency
    },
    {
      title: "Change (%)",
      dataIndex: "percentChange",
      key: "percentChange",
      render: (change: number) => (
        <span style={{ color: change >= 0 ? "green" : "red" }}>
          {change.toFixed(2)}%
        </span>
      ),
    },
  ];

  return (
    <div className='flex flex-col justify-center gap-8'>
      <div>
        <h1 className='text-2xl font-bold mb-4 text-gray-700'>
          Explore new stocks
        </h1>
        <LookupInput />
      </div>

      <div>
        <h1 className='text-2xl font-bold mb-4 text-gray-700'>
          Favorite stock
        </h1>
        {/* Ant Design Table Component */}
        <Table
          dataSource={portfolioStore.stocks} // Pass the stocks as dataSource
          columns={columns} // Columns for the table
          rowKey='symbol' // Use stock symbol as the unique key for each row
          pagination={false} // Disable pagination for simplicity
        />
      </div>
    </div>
  );
});

export default Portfolio;
