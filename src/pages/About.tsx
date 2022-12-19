import {
  ImageNextToLogo,
  LeftBiggerImage,
  LeftSmallIMage,
  RightLowerImage,
} from "@/assets";
import { Title } from "@/components";

const About = () => {
  /**
   * Page States
   */

  return (
    <section className="flex flex-col gap-[2rem] pb-[7rem] xs:px-[1rem] lg:pb-[4rem]">
      {/* Top */}
      <section className="flex items-center gap-5">
        {/* Logo */}
        <div className="relative mt-2">
          <h1 className="text-[5rem] absolute top-[3rem] -left-[0.2rem] rotate-90 font-extrabold text-blue-900/50 z-10 ">
            ABOUT
          </h1>
          <h2 className="text-[1.9rem] whitespace-nowrap z-20 font-extrabold  left-0 text-gray-900 ">
            About LS
          </h2>
        </div>

        {/* Image */}
        <div>
          <img
            src={ImageNextToLogo}
            alt=""
            className="duration-300 object-cover h-[10rem] rounded-xl w-[15rem] sm:w-[19rem] md:w-[22rem] xmd:h-[14rem] xmd:w-[26rem] lg:w-[35rem] lg:h-[15rem]"
          />
        </div>
      </section>

      {/* Bottom */}
      <section className="flex flex-col gap-10">
        {/* Left Side */}
        <div className=" flex flex-col gap-4 xmd:flex">
          {/* the small image */}
          <div className="flex justify-end mr-6">
            <img
              src={LeftSmallIMage}
              alt=""
              className="duration-300 object-cover h-[6rem] w-[12rem] rounded-[2rem] sm:w-[15rem] md:w-[19rem] md:h-[9rem] lg:w-[25rem] xl:w-[32rem]"
            />
          </div>

          <div className="xmd:flex gap-[2rem] items-center">
            {/* the bigger image  */}
            <div className="">
              <img
                src={LeftBiggerImage}
                alt=""
                className="duration-300 object-cover h-[10rem] w-[16rem] rounded-xl sm:w-[19rem] md:w-[22rem] lg:w-[26rem] xl:w-[30rem]"
              />
            </div>

            {/* the text */}
            <div className="flex flex-col">
              <span className="text-[1.5rem] font-extralight text-gray-500">
                We Ensure
              </span>
              <div className=" flex flex-row gap-5  px-2 items-center border justify-center text-[1.9rem] whitespace-nowrap z-20 font-extrabold  left-0 text-blue-900/80 rounded xl:gap-[4rem]">
                <span className="">Time</span>
                <span>Talent</span>
                <span>Money</span>
              </div>

              <span className=" capitalize flex justify-end text-gray-500 gap-2 text-sm">
                is Delivered To Those Who Need It All Over{" "}
                <span className="text-gray-900 font-bold">MALAYSIA 🥰.</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-3">
          {/* The Words */}
          <div className="flex flex-col gap-2 md:w-[26rem]">
            <Title title="Sharing is Caring" title_styles="text-[2rem]" />

            <p className="text-gray-400 xmd:text-left">
              We aim to increase the transparency of charities and thus enhance
              users’ trust in our organization and promote the philanthropy of
              blockchain-based charity system
            </p>
          </div>

          <div className="relative flex flex-col">
            <div className="text-[4rem] leading-[3.6rem] font-extrabold text-gray-200/50 flex flex-col w-fit md:text-[5rem] md:leading-[4rem]">
              <span className="">Faith</span>
              <span className="ml-[2.5rem] md:ml-[4rem]">Love</span>
              <span className="ml-[5rem] md:ml-[7rem]">Hope</span>
            </div>
            {/* Image */}
            <div className="flex justify-end absolute top-0 right-0 pb-5  xmd:-top-[6rem]">
              <img
                src={RightLowerImage}
                alt=""
                className="duration-300 object-cover rounded-[2rem] h-[15rem] w-[11.5rem] xs:h-[14rem] xs:w-[15rem] sm:w-[18rem] md:w-[20rem] xmd:w-[23.5rem] lg:w-[30rem] lg:h-[18rem] xl:w-[37rem]"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
