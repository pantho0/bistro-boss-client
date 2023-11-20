import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";

const UpdateItem = () => {
  const item = useLoaderData();
  const {_id, name, price, recipe, category} = item
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async(data) => {
    console.log(data);
    const imageFile = {image : data.image[0]}
    // img upload to img bb and then get url.
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers:{
        'content-type':"multipart/form-data"
      }
    })
    if(res.data.success){
      // now send the data to the server with the img url
      const menuItem = {
        name : data.name,
        category : data.category,
        price : parseFloat(data.price),
        recipe : data.recipe,
        image : res.data.data.display_url
      }
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
      console.log(menuRes.data);
      if(menuRes.data.insertedId){
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is Added`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    console.log('with image url',res.data);
  };  
  
  return (
    <div>
      <SectionTitle
        heading={"Update an Item"}
        subHeading={"Need to update something"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipie Name?</span>
            </label>
            <input
              type="text"
              defaultValue={name}
              {...register("name")}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            {/* Category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue={category}
                {...register("category")}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                defaultValue={price}
                {...register("price")}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* Recipe Details */}
          <div className="form-control my-6">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              defaultValue={recipe}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <button className="btn">
            Update Item <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
