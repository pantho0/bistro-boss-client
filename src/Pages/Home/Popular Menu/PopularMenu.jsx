
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/Menu-Item/MenuItem";
import useMenu from "../../../Components/Hooks/useMenu";


const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItems = menu.filter(item => item.category === "popular")
    console.log(menu);
    return (
       <section className="mb-12">
        <SectionTitle
        heading="From Our Menu"
        subHeading="Popular Items"
        >
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
            {
                popularItems.map(item => 
                <MenuItem key={item._id} item={item}>
                
                </MenuItem>)
            }
        </div>
       </section>
    );
};

export default PopularMenu;