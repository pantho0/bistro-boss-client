import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log(users);
  const handleDeleteUser = (user) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`)
          .then((res) => {
            
            if (res.data.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "File deleted.",
                icon: "success",
              });
            }
          })
          .catch(error => {
            console.log(error);
          })
        }
      });
  };

  const handleMakeAdmin = user =>{
    axiosSecure.patch(`/user/admin/${user._id}`)
    .then(res => {
        if(res.data.modifiedCount > 0){
            refetch()
            Swal.fire({
                title: "Done!",
                text: `${user.name} is ADMIN now`,
                icon: "success",
              });
        }
    })
  } 

  return (
    <>
      <div className="flex justify-between p-8">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {users.map((user, idx) => (
                <tr className="w-full" key={user._id}>
                  <th>
                  {idx+1}
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    { user.role === "admin" ? "ADMIN" :  <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-orange-500 btn-lg text-white"
                    >
                      <FaUser></FaUser>
                    </button>}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-lg text-red-600"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
