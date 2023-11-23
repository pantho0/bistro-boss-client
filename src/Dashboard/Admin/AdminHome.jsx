import useAuth from "../../Components/Hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">
        <span>Welcome </span>
        {
            user ? user.displayName : 'Back'
        }
      </h2>
    </div>
  );
};

export default AdminHome;
