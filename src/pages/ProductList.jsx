import React from "react";
import { useEffect, useContext,useState } from "react";
import { deleteProduct, getProducts } from "../context/product/ProductActions";
import { FaTrash,FaEdit } from "react-icons/fa";
import ProductContext from "../context/product/ProductContext";
import EditBox from "../components/EditItemBox";
import AddItemBox from "../components/AddItemBox";
import { toast } from "react-hot-toast";
function ItemList() {
  const { consoles, games, accessories, dispatch, loading } =
    useContext(ProductContext);

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showBox, setShowBox] = useState(false);
  const[addBox,setAddBox]=useState(false)

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });
    const fetchProductsData = async () => {
      const response = await getProducts();
      dispatch({
        type: "SET_DATA",
        payload: response.data.data.data,
      });
    };

    fetchProductsData();

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }, []);

  const handleDelete = async (item) => {
    const response = await deleteProduct(item._id);
    console.log(response);
    if (response.data.success) {
      dispatch({
        type: "DELETE_PRODUCT",
        payload: item._id,
      });
   toast.success("Product Deleted Successfully!", { position: "top-center" });
    }
  };
  
    const handleEditClick = (item) => {
      setShowBox(true); // Show the box when "Edit" is clicked
      setSelectedProduct(item);
    };
  
    const handleAddClick=() => {
      setAddBox(true)
    }
    

  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;

    return (
      <div className="overflow-x-auto min-h-screen ">
        <button onClick={handleAddClick} className="btn btn-md btn-primary float-end lg:mt-5 mr-5">Add Product</button>
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="text-xl">

              <th>Name</th>
              <th>Category</th>
              <th>Price $</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games
              ? games.map((item, index) => (
                  <tr key={index} className="hover text-xl">
                    <td>{item.name}</td>
                    <td>{`${item.category[0].toUpperCase()}${item.category.slice(
                      1
                    )}`}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                    <button onClick={() => handleDelete(item)}>
                      <FaTrash color='gray' size={18}/></button> 
                     <button onClick={()=>handleEditClick(item)} className='ml-2'><FaEdit color='gray' size={18}/></button>
                    </td>
                  </tr>
                ))
              : ""}
            {consoles
              ? consoles.map((item, index) => (
                  <tr key={index} className="hover text-lg">
                    <td>{item.name}</td>
                    <td>{`${item.category[0].toUpperCase()}${item.category.slice(
                      1
                    )}`}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                    <button onClick={() => handleDelete(item)}>
                      <FaTrash color='gray' size={18}/></button> 
                     <button onClick={()=>handleEditClick(item)} className='ml-2'><FaEdit color='gray' size={18}/></button>
                    </td>
                  </tr>
                ))
              : ""}
            {accessories
              ? accessories.map((item, index) => (
                  <tr key={index} className="hover">
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{`${item.category[0].toUpperCase()}${item.category.slice(
                      1
                    )}`}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                    <button onClick={() => handleDelete(item)}>
                      <FaTrash color='gray' size={18}/></button> 
                     <button onClick={()=>handleEditClick(item)} className='ml-2'><FaEdit color='gray' size={18}/></button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>

        {
          showBox&&(
            <div>
              <EditBox showBox={showBox} setShowBox={setShowBox} item={selectedProduct}/>
            </div>
          )
        }
        {
          addBox&&(
            <AddItemBox setAddBox={setAddBox} addBox={addBox} />
          )
        }
      </div>
    );
  
}

export default ItemList;
