// "use client";
// import { assets } from "@/assets/assets";
// import axios from "axios";
// import Image from "next/image";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const page = () => {
//   const [image, setImage] = useState(false);
//   const [data, setdata] = useState({
//     title: "",
//     description: "",
//     category: "Startup",
//     author: "Samar Hayat",
//     authorImg: "/author.png",
//   });
//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setdata((data) => ({ ...data, [name]: value }));
//     console.log(data);
//   };
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("category", data.category);
//     formData.append("author", data.author);
//     formData.append("authorImg", data.authorImg);
//     formData.append("image", image);
//     const response = await axios.post("/api/blog", formData);
//     if (response.data.success) {
//       toast.success(response.data.msg);
//       setImage(false);
//       setdata({
//         title: "",
//         description: "",
//         category: "Startup",
//         author: "Samar Hayat",
//         authorImg: "/author.png",
//       });
//     } else {
//       toast.error("Error");
//     }
//   };
//   return (
//     <>
//       <form onSubmit={onSubmitHandler} className=" pt-5 px-5 sm:pt-12 pl-16">
//         <p className="text-xl ">Upload Thumbnail</p>
//         <label htmlFor="image">
//           <Image
//             src={!image ? assets.upload_area : URL.createObjectURL(image)}
//             width={140}
//             alt=""
//             height={70}
//             className="mt-4"
//           />
//         </label>
//         <input
//           onChange={(e) => setImage(e.target.files[0])}
//           type="file"
//           id="image"
//           hidden
//           required
//         />
//         <p className="text-xl mt-4 ">Blog Title</p>
//         <input
//           type="text"
//           name="title"
//           onChange={onChangeHandler}
//           value={data.title}
//           placeholder="Type Here"
//           required
//           className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
//         />
//         <p className="text-xl mt-4 ">Blog Description</p>
//         <textarea
//           name="description"
//           onChange={onChangeHandler}
//           value={data.description}
//           type="text"
//           placeholder="Content Here"
//           rows={6}
//           required
//           className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
//         />
//         <p className="text-xl mt-4">Blog Category</p>
//         <select
//           name="category"
//           onChange={onChangeHandler}
//           value={data.category}
//           className="w-40 mt-4 py-3 px-4 border text-gray-500 "
//         >
//           <option value="Startup">Startup</option>
//           <option value="Technology">Technology</option>
//           <option value="Lifestyle">Lifestyle</option>
//         </select>
//         <br />
//         <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
//           Add
//         </button>
//       </form>
//     </>
//   );
// };

// export default page;

"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Samar Hayat",
    authorImg: "/author.png",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = async (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(data); // Check if data updates correctly after blur
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(null);
      setImagePreview(null);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Samar Hayat",
        authorImg: "/author.png",
      });
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            src={imagePreview || assets.upload_area}
            width={140}
            alt=""
            height={70}
            className="mt-4"
          />
        </label>
        <input
          onChange={handleImageChange}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog Title</p>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={data.title}
          placeholder="Type Here"
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        />
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={data.description}
          placeholder="Content Here"
          rows={6}
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={handleChange}
          value={data.category}
          className="w-40 mt-4 py-3 px-4 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Add
        </button>
      </form>
    </>
  );
};

export default Page;
