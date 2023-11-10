

const MenuItem = ({item}) => {
    const {image, name, price, recipe} = item;
    return (
        <div className="flex space-x-4">
            <img style={{borderRadius : '0px 200px 200px 200px'}} className="w-[110px]" src={image} alt="" />
            <div>
                <h3>{name}-------</h3>
                <p>{recipe}</p>
                <p className="text-yellow-600">${price}</p>
            </div>
            
        </div>
    );
};

export default MenuItem;