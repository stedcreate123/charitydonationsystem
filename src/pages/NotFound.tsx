import React from "react";
import { NotFoundSvg } from "@/assets";

const NotFound = () => {
  return (
    <section className="h-[25rem] flex flex-col gap-5 items-center pt-16">
      <div className="w-[15rem] h-[15rem] bg-gray-900 rounded-full flex justify-center items-center">
        <img
          src={NotFoundSvg}
          alt="not_found_svg"
          className="px-2 py-2 w-[10rem] h-[10rem] "
        />
      </div>

      <p className="px-5 text-center text-lg text-gray-900 font-bold ">
        Sorry😥! <br />{" "}
        <span>The Page You Are Tying To Access Is Not Found.</span>
      </p>
    </section>
  );
};

export default NotFound;
