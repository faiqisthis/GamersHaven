import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ProductContext from "../context/product/ProductContext";
import { getConsoles } from "../context/product/ProductActions";
function Explore() {
  const { consoles, games, accessories, loading, dispatch } =
    useContext(ProductContext);
  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    const fetchConsoles = async () => {
      const response = await getConsoles();
      dispatch({
        type: "SET_CONSOLES",
        payload: response.data.data.data,
      });
    };
    fetchConsoles();
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }, []);
  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <>
      <div className="bg-white">
        <div className="min-h-screen max-w-[1440px] p-[64px] ">
          <div className=" w-full min-h-screen pt-5 relative z-10">
            <div>
              <h1 className="md:text-2xl text-xl font-bold px-5 md:mt-5 text-gray-300">
                Consoles
              </h1>
            </div>

            {/* Grid layout for consoles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consoles.map((console) => (
                <>
                  <Card key={console.id} console={console} />
                </>
              ))}
            </div>

            <h1 className="md:text-2xl text-xl font-bold px-5 md:mt-5 text-gray-300">
              Games
            </h1>

            {/* Grid layout for games */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card /> <Card /> <Card /> <Card />
            </div>

            <h1 className="md:text-2xl text-xl font-bold px-5 md:mt-5 text-gray-300">
              Gaming Accessories
            </h1>

            {/* Grid layout for accessories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card /> <Card /> <Card /> <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
