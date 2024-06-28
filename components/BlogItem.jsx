import { assets, blog_data } from "@/assets/assets";
import Image from "next/image";

const BlogItem = () => {
  return (
    <div className=" max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
      <Image
        src={blog_data[0].image}
        alt={blog_data[0].titile}
        width={400}
        height={400}
        className="border-b border-black"
      />
      <p className=" ml-5 mt-5 px-1 inline-block">{blog_data[0].category}</p>
    </div>
  );
};

export default BlogItem;
