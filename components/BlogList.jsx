import BlogItem from "./BlogItem";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const buttonClasses = (currentMenu) =>
    `py-1 px-4 ${menu === currentMenu ? "bg-black text-white rounded-sm" : ""}`;

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={buttonClasses(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => (
            <BlogItem
              key={index}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
