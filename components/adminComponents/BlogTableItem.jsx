import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({
  authorImg,
  date,
  title,
  author,
  deleteBlog,
  mongoId,
}) => {
  const blogDate = new Date(date);
  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className="items-center gap-3 hidden text-gray-900 whitespace-nowrap sm:flex px-6 py-4 font-medium"
      >
        <Image
          width={40}
          height={40}
          src={authorImg ? authorImg : assets.profile_icon}
          className="rounded-full"
        />
        <p>{author ? author : "no Author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "no title"}</td>
      <td className="px-6 py-4">{blogDate.toDateString()}</td>
      <td
        className="px-6 cursor-pointer py-4"
        onClick={() => deleteBlog(mongoId)}
      >
        x
      </td>
    </tr>
  );
};

export default BlogTableItem;
