import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
function Card({ key, console }) {
  const { name, price, _id, slug, images } = console || {};
  return (
    <Link
      to={_id ? `/product/${slug}/${_id}` : "#"}
      key={key}
      className="bg-[#fefae0] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group border-2 border-[#dda15e] hover:border-[#bc6c25]"
    >
      <div className="relative h-[300px] overflow-hidden bg-[#283618]">
        <img
          src={images ? images[0] : ""}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#dda15e] text-[#283618] px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          {/* <span>{product.rating}</span> */}
          <span>4.5</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl text-[#283618] group-hover:text-[#bc6c25] transition-colors">
            {name}
          </h3>
          <span className="text-2xl text-[#bc6c25]">${price}</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
