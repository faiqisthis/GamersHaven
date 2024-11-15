import React from "react";
import { Link } from "react-router-dom";
function Card({key,console}) {
  const { name, price,_id,slug,images } = console || {}; 
  return (
    <div id={key} className="card w-[260px]  flex-shrink-0 bg-base-100 mx-auto md:w-64 mt-3 shadow-xl hover:shadow-slate-400 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <figure className="h-[200px] w-full flex items-center justify-center overflow-hidden">
        <img className="object-contain h-full w-full" src={images ? images[0]:""} alt="" />
      </figure>
      <div className="card-body">
        <div className="flex justify-between h-[100px]">
          <h2 className="card-title">{name||""}</h2>
          <h2 className="card-title">${price || ""}</h2>
        </div>
        <div className="card-actions justify-center mt-2 ">
          <Link to={`/product/${slug||""}/${_id||""}`} className="btn btn-md w-full btn-primary">Buy</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
