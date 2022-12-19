import { LogoImage } from "@/assets";
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <section className="w-[7rem] h-[7rem]">
        <img src={LogoImage} alt="" className="w-full h-full object-cover" />
      </section>
    </Link>
  );
};

export default Logo;
