import React, { useState, useEffect } from "react";
import { AutoComplete, Input, message } from "antd";
import axios from "axios";
import type { AutoCompleteProps } from "antd";
import { useRouter } from "next/navigation";

const apiKey = "GbG56jeXbPtEB50wsjrbvke3rfxKkgxL"; //process.env.financialmodelingprep_key; // Replace with your actual API key

const LookupInput: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch stock data from the Financial Modeling Prep API
  const fetchStockData = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
      );

      const results = response.data.map((stock: any) => ({
        value: stock.symbol,
        label: (
          <div className='flex flex-col justify-center'>
            <span className='font-bold'>{stock.symbol}</span>

            <span className=' text-foreground text-xs text-gray-800'>
              {stock.name}
            </span>
          </div>
        ),
      }));
      setOptions(results);
    } catch (error) {
      message.error("Failed to fetch stock data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    if (value) {
      fetchStockData(value);
    } else {
      setOptions([]);
    }
  };

  const onSelect = (value: string) => {
    // console.log("onSelect", value);
    router.push("/stock/" + value);
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      size='large'
      //loading={loading} // Show loading indicator when fetching data
    >
      <Input.Search
        size='large'
        placeholder='type stock symbol...'
        enterButton
      />
    </AutoComplete>
  );
};

export default LookupInput;
