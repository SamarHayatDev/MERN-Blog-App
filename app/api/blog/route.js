// import { ConnectDB } from "@/lib/config/db";
// import BlogModel from "@/lib/models/BlogModel";
// import { writeFile } from "fs/promises";
// const { NextResponse } = require("next/server");
// const fs = require("fs");

// const LoadDB = async () => {
//   await ConnectDB();
// };
// LoadDB();

// // API Endpoints to get all blogs
// export async function GET(request) {
//   const blogId = request.nextUrl.searchParams.get("id");
//   if (blogId) {
//     const blog = await BlogModel.findById(blogId);
//     return NextResponse.json(blog);
//   } else {
//     const blogs = await BlogModel.find({});
//     return NextResponse.json({ blogs });
//   }
// }

// // API endpoint for uploading blogs
// export async function POST(request) {
//   const formData = await request.formData();
//   const timestamp = Date.now();

//   const image = formData.get("image");
//   const imageByteData = await image.arrayBuffer();
//   const buffer = Buffer.from(imageByteData);
//   const path = `./public/${timestamp}_${image.name}`;
//   await writeFile(path, buffer);
//   const imgUrl = `/${timestamp}_${image.name}`;

//   const blogData = {
//     title: `${formData.get("title")}`,
//     description: `${formData.get("description")}`,
//     category: `${formData.get("category")}`,
//     author: `${formData.get("author")}`,
//     image: `${imgUrl}`,
//     authorImg: `${formData.get("authorImg")}`,
//   };
//   await BlogModel.create(blogData);
//   console.log("blog saved");
//   return NextResponse.json({ success: true, msg: "blog added" });
// }

// // Creating API endpoint to del blog
// export async function DELETE(request) {
//   const id = await request.nextUrl.searchParams.get("id");
//   const blog = await BlogModel.findById(id);
//   fs.unlink(`./public${blog.image}`, () => {});
//   await BlogModel.findByIdAndDelete(id);
//   return NextResponse.json({ msg: "Blog Deleted" });
// }

// code change

import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
const fs = require("fs");

const LoadDB = async () => {
  try {
    await ConnectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
LoadDB();

// API Endpoints to get all blogs
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

// API endpoint for uploading blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    console.log("Received formData:", formData);

    const timestamp = Date.now();
    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;

    console.log("Writing file to path:", path);
    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    console.log("Creating blog with data:", blogData);
    await BlogModel.create(blogData);
    console.log("Blog saved successfully");

    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    console.error("Error uploading blog:", error);
    return NextResponse.json(
      { error: "Error uploading blog" },
      { status: 500 }
    );
  }
}

// Creating API endpoint to delete blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log("Deleting blog with id:", id);

    const blog = await BlogModel.findById(id);
    if (!blog) {
      console.error("Blog not found:", id);
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    console.log("Deleting file:", `./public${blog.image}`);
    fs.unlink(`./public${blog.image}`, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    await BlogModel.findByIdAndDelete(id);
    console.log("Blog deleted successfully");

    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
