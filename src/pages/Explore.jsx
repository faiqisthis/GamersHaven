import { useEffect, useContext, useState } from "react";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import ProductContext from "../context/product/ProductContext";
import { getConsoles } from "../context/product/ProductActions";
import {Spinner} from "@/components/ui/spinner"
import Card from "../components/Card";
function Explore() {
  const { consoles, loading, dispatch } = useContext(ProductContext);

  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState(""); // "" | "4+" | "3+" | "2+"

  // Fetch consoles
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const fetchConsoles = async () => {
      const response = await getConsoles();
      dispatch({ type: "SET_CONSOLES", payload: response.data.data.data });
    };
    fetchConsoles().finally(() =>
      dispatch({ type: "SET_LOADING", payload: false })
    );
  }, []);

  const resetFilters = () => {
    setCategory("All");
    setPriceRange([0, 500]);
    setRating("");
  };

  if (loading)
    return (
      <div className="bg-white min-h-screen flex w-full justify-center items-center">
         <Spinner className="w-12 h-12 text-gray-500" />
      </div>
    );

  return (
    <div className="bg-white">

      <div className="  bg-[#f0f1f2] border-b">
      <div className="max-w-[1440px] mx-auto  md:p-[64px] py-[48px] px-[20px]">
        <h1 className="text-[#0a0a0a] text-[24px] font-semibold">
          All Products
        </h1>
        <p className="mt-2 text-[#8f9fbc]">
          Explore our complete collection of gaming gear
        </p>
      </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto ">
      <div className="md:p-[64px] p-[20px] grid md:grid-cols-4 gap-[40px]">
        <div className="flex flex-col gap-[25px] w-full md:sticky  md:top-24 md:self-start ">
          {/* Search */}
          <div className="flex flex-col gap-[20px]">
            <h1 className="text-black text-[18px]">Search</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-9 bg-white py-2 rounded-md w-full "
                />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-[20px]">
            <h1 className="text-black text-[18px]">Category</h1>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className=" border-none ">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="consoles">Consoles</SelectItem>
                  <SelectItem value="games">Games</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range (KEEP YOUR ORIGINAL SLIDER DESIGN) */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex w-full justify-between">
              <h1 className="text-black text-[18px]">Price Range</h1>
              <h1 className="text-[18px] text-gray-500">
                ${priceRange[0]} - ${priceRange[1]}
              </h1>
            </div>
            <Slider
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="cursor-pointer"
              />
          </div>

          {/* Minimum Ratings */}
          <div className="flex flex-col gap-[20px]">
            <h1 className="text-black text-[18px]">Minimum Ratings</h1>
            <Select onValueChange={setRating} value={rating}>
              <SelectTrigger className=" border-none ">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="py-1 px-1">
                  <SelectItem value="4+">4+ Stars</SelectItem>
                  <SelectItem value="3+">3+ Stars</SelectItem>
                  <SelectItem value="2+">2+ Stars</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            className="w-full font-bold border-none"
            onClick={resetFilters}
            >
            <Filter className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6 flex-1 md:col-span-3">
          {/* Render your products here, e.g., map over consoles */}
          {consoles.map((console) => (
            <Card key={console.id} console={console} />
          ))}
        </div>
      </div>
    </div>
          </div>
  );
}

export default Explore;
