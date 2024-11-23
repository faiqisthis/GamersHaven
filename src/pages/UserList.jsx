import React, { useEffect,useContext } from 'react'
import { FaEdit,FaTrash } from 'react-icons/fa';
import { getUsers } from "../context/users/UsersAcrions";
import UsersContext from "../context/users/UsersContext";
function UserList() {
    const {users,dispatch,loading}=useContext(UsersContext)

    useEffect(()=>{
        dispatch({
            type: "SET_LOADING",
            payload: true,
          });
        const fetchUsersData=async () => {
            const response=await getUsers();
            console.log(response.data.data)
            dispatch({
              type: "SET_USERS",
              payload:response.data.data
            })
          }
          fetchUsersData();
          dispatch({
            type: "SET_LOADING",
            payload: false,
          })
    },[])

    const handleDelete = async (item) => {
        const response = await deleteUser(item._id);
        console.log(response);
        if (response.data.success) {
          dispatch({
            type: "DELETE_USER",
            payload: item._id,
          });
          alert("Product Deleted Successfully!");
        }
      };
      if (loading)
        return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users
              ? users.map((item, index) => (
                  <tr key={index} className="hover">
                    <td>{index + 1}</td>
                    <td>{item.firstName} {item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{`${item.role[0].toUpperCase()}${item.role.slice(
                      1
                    )}`}</td>
                    <td>
                      <button onClick={() => handleDelete(item)}>
                      <FaTrash color='gray' size={18}/></button> 
                     <button className='ml-2'><FaEdit color='gray' size={18}/></button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>

  )
}

export default UserList
