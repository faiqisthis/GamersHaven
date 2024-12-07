import React, { useEffect, useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getUsers } from "../context/users/UsersActions";
import UsersContext from "../context/users/UsersContext";
import EditUserBox from "../components/EditUserBox";
import AddUserBox from "../components/AddUserBox";
import { deleteUser } from "../context/users/UsersActions";
function UserList() {
  const { users, usersDispatch, loading } = useContext(UsersContext);
  const [showBox, setShowBox] = useState(false);
  const [addBox, setAddBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    usersDispatch({
      type: "SET_LOADING",
      payload: true,
    });
    const fetchUsersData = async () => {
      const response = await getUsers();
      usersDispatch({
        type: "SET_USERS",
        payload: response.data.data,
      });
    };
    fetchUsersData();
    usersDispatch({
      type: "SET_LOADING",
      payload: false,
    });
  }, []);
  const handleUserEdit = (item) => {
    setShowBox(true);
    setSelectedUser(item);
  };
  const handleUserCreate = () => {
    setAddBox(true);
  };

  const handleDelete = async (item) => {
    const response = await deleteUser(item._id);
    if (response.data.success) {
      usersDispatch({
        type: "DELETE_USER",
        payload: item._id,
      });
      alert("User Deleted Successfully!");
    }
  };
  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <div className="overflow-x-auto min-h-screen">
      <button
        onClick={() => handleUserCreate()}
        className="btn btn-primary lg:mt-5 float-right mr-5 border-2"
      >
        Add User
      </button>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-xl">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((item, index) => (
                <tr key={index} className="hover text-lg">
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.email}</td>
                  {
                    item.role? <td>{`${item.role[0].toUpperCase()}${item.role.slice(
                      1
                    )}`}</td>:""
                  }
                 
                  <td>
                    <button onClick={() => handleDelete(item)}>
                      <FaTrash color="gray" size={18} />
                    </button>
                    <button
                      onClick={() => handleUserEdit(item)}
                      className="ml-2"
                    >
                      <FaEdit color="gray" size={18} />
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      {showBox && (
        <EditUserBox
          showBox={showBox}
          setShowBox={setShowBox}
          user={selectedUser}
        />
      )}
      {addBox && <AddUserBox setAddBox={setAddBox} addBox={addBox} />}
    </div>
  );
}

export default UserList;
