"use client";
import { assets, blog_data } from "@/assets/assets";
import axios from "axios";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
const page = ({ params }) => {
  const [data, setData] = useState(null);
  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setData(response.data);
  };
  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28 ">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt={assets.logo}
              className="w-[130px] sm:w-auto "
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={assets.arrow} alt={assets.arrow} />
          </button>
        </div>
        <div className="text-center my-24 ">
          <h1 className=" text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className=" mx-auto mt-6 border border-white rounded-full "
            src={data.authorImg}
            width={60}
            height={60}
            alt={data.authorImg}
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto ">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className=" border-4 border-white "
          src={data.image}
          alt={data.image}
          width={1280}
          height={720}
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[18px] font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ut
          quisquam blanditiis aperiam, accusantium fugit!
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ut
          quisquam blanditiis aperiam, accusantium fugit!
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ut
          quisquam blanditiis aperiam, accusantium fugit!
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ut
          quisquam blanditiis aperiam, accusantium fugit!
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ut
          quisquam blanditiis aperiam, accusantium fugit!
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ut
          quisquam blanditiis aperiam, accusantium fugit!
        </p>
        <h3 className="my-5 text-[18px] font-semibold">Concolutions</h3>

        <p className="my-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic neque
          obcaecati ea voluptates dicta ex a. Rerum tempore quaerat facere
          perspiciatis dicta odit, ipsum laborum totam nemo praesentium, placeat
          officiis.
        </p>
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on Social Media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="facebook logo" width={50} />
            <Image src={assets.twitter_icon} alt="Twitter logo" width={50} />
            <Image
              src={assets.googleplus_icon}
              alt="Google Plus logo"
              width={50}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
