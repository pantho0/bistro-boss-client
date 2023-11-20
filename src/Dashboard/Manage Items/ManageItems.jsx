import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../Components/Hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const ManageItems = () => {
  const [menu] = useMenu();
 const handleDeleteItem = (item) =>{

 }   
  return (
    <div>
      <SectionTitle
        heading={"manage items"}
        subHeading={"Mange your items here"}
      ></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                menu.map((item, idx) => <tr key={item._id}>
                    <td>
                      {idx+1}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.name}
                    </td>
                    <td>{item.price}</td>
                    <td>
                    <button
                      className="btn bg-orange-500 btn-sm text-white"
                    >
                      <FaEdit></FaEdit>
                    </button>
                    </td>
                    <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-lg text-red-600"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                    </td>
                  </tr>)
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
