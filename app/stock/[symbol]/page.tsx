// app/stock/[symbol]/page.tsx
"use client"; // Client-side rendering for dynamic routes

const StockDetails = ({ params }: any) => {
  const symbol = params.symbol; // Get the stock symbol from the route

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Stock Details for {symbol}</h1>
      {/* Here, you'd fetch and display stock details */}
    </div>
  );
};

export default StockDetails;
