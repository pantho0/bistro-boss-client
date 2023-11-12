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
        </div>
    );
};

export default MenuCategory;