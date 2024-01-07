import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxios()

  
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageField = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_API, imageField, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    if(res.data.success){
        // now send the menu item data to the server with the image url
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }

        const menuRes = await axiosSecure.post('/menus', menuItem)
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            //show success popup
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the menu.`,
                showConfirmButton: false,
                timer: 1500
              });
    
        }
       
    }
  };
  return (
    <div>
      <SectionTitle
        heading={"Add Item"}
        subHeading={"What's New?"}
      ></SectionTitle>

      <div className="bg-[#F3F3F3] p-12">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="default"
                className="select select-bordered w-full"
                {...register("category")}
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="form-control w-full">
            <input
            {...register("image")}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <div>
            <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] ... text-white ">
              Add Item
              <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
