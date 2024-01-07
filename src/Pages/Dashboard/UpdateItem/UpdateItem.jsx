import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxios from "../../../Hooks/useAxios";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateItem = () => {
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios()
    const {name, recipe, price, _id} = useLoaderData()
    

    const onSubmit = async (data) => {
        console.log(data);
        const updateItem = {
            name: data.name,
            recipe: data.recipe,
            price: parseFloat(data.price),
            category: data.category
        }
        axiosSecure.patch(`/menus/${_id}`, updateItem)
        .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
        
            }
        })

      };
  return (
    <div>
      <SectionTitle heading={"Update Item"}></SectionTitle>

      <div className="bg-[#F3F3F3] p-12">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
            defaultValue={name}
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
              defaultValue={price}
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
            defaultValue={recipe}
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
              Update Recipe Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
