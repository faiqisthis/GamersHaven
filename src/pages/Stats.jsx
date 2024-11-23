import React from 'react'
import  BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import LineChart from '../components/LineChart'
function Stats() {
  return (
    <>
    <div className="flex">
    <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
      <div className="card-body">
        <h2 className="card-title text-primary text-center">Total Sales</h2>
        <h2 className="text-3xl font-bold text-center">$ 67,845</h2>
        <p className=" text-accent text-center">↗︎ 12,890 (22%)</p>
      </div>
    </div>
    <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
      <div className="card-body">
        <h2 className="card-title text-primary text-center">Total Profit</h2>
        <h2 className="text-3xl font-bold text-center">$ 45,845</h2>
        <p className=" text-accent text-center">↗︎ 10,368 (29%)</p>
      </div>
    </div>
    <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
      <div className="card-body">
        <h2 className="card-title text-primary text-center">Total Customers </h2>
        <h2 className="text-3xl font-bold text-center">50</h2>
        <p className=" text-red-800 text-center"> ↘︎ 90 (14%)</p>
       
      </div>
    </div>
    <div className="card ml-5 bg-base-200 w-72 shadow-xl transform transition-transform duration-300 hover:scale-105">
      <div className="card-body">
        <h2 className="card-title text-primary text-center">Total Products </h2>
        <h2 className="text-3xl font-bold text-center">75</h2>
      </div>
    </div>
    </div>
    <div className="grid grid-cols-2">
    <BarChart/>
    <PieChart />
    <LineChart/>
    </div>
    </>
   
  )
}

export default Stats
