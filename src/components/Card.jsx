import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
function Card({key, console}) {
   const { name, price, _id, slug, images,category } = console || {};

   //use price as original price and 20% discount for demo
   const originalPrice = price ? price + price * 0.2 : null;
   const discount = originalPrice
     ? Math.round(((originalPrice - price) / originalPrice) * 100)
     : 0;

  return (
    <div className="group relative rounded-lg border overflow-hidden transition-all hover:shadow-lg" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(96, 108, 56, 0.2)' }}>
      {/* Image */}
      <Link to={`/product/${slug}/${_id}`} className="block aspect-square overflow-hidden" style={{ backgroundColor: '#e2e7d1' }}>
        <img
          src={images[0]}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {/* {badge && (
          <Badge className="bg-accent text-accent-foreground" style={{ backgroundColor: '#bc6c25', color: '#fefae0' }}>{badge}</Badge>
        )} */}
        {discount > 0 && (
          <Badge className="bg-destructive text-destructive-foreground" style={{ backgroundColor: '#d4183d', color: '#ffffff' }}>
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {category && (
          <p className="text-xs uppercase tracking-wide" style={{ color: '#606c38' }}>
            {category}
          </p>
        )}
        
        <Link to={`/product/${slug}/${_id}`}>
          <h3 className="line-clamp-2 group-hover:text-primary transition-colors" style={{ color: '#283618' }}>
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" style={{ fill: '#dda15e', color: '#dda15e' }} />
            <span className="text-sm" style={{ color: '#283618' }}>4.5</span>
          </div>
          <span className="text-xs" style={{ color: '#606c38' }}>(123)</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold" style={{ color: '#606c38' }}>
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm line-through" style={{ color: '#717182' }}>
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <Button size="icon" style={{ backgroundColor: '#606c38', color: '#fefae0' }}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Card;