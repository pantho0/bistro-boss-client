import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import {FaDollarSign,FaList,FaUsers } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ["admin-asset"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl">
        <span>Welcome </span>
        {user ? user.displayName : "Back"}
      </h2>
      <div className="my-10">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaDollarSign className="text-3xl"></FaDollarSign>
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${stats.revenue}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl"></FaUsers>
            </div>
            <div className="stat-title">Users</div>
            <div className="stat-value">{stats.users}</div>
            <div className="stat-desc">↗︎ With Admin & Customers</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl"></FaUsers>
            </div>
            <div className="stat-title">Menu Items</div>
            <div className="stat-value">{stats.menuItems}</div>
            <div className="stat-desc">↗︎ Total Foods Overview</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaList className="text-3xl"></FaList>
            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">{stats.orders}</div>
            <div className="stat-desc">↘︎ All Orders Overview</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
