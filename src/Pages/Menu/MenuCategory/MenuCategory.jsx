import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/Menu-Item/MenuItem";

const MenuCategory = ({items, title, coverImg}) => {
    return (
        <div>
            {title && <Cover img={coverImg} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-4">
            {
                items.map(item => 
                <MenuItem key={item._id} item={item}>
                
                </MenuItem>)
            }
        </div>
        <div className="text-center my-4">
            <Link to={`/order/${title}`}>
            <button className="btn btn-active  bg-white border-0 border-b-slate-500 border-b-2">Order Now</button>
            </Link>
        </div>
        </div>
    );
};

export default MenuCategory;