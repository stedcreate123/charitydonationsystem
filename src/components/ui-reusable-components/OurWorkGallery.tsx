import {
  CharityEventImage1,
  CharityEventImage2,
  CharityEventImage3,
  CharityEventImage4,
  CharityEventImage5,
  CharityEventImage6,
  CharityEventImage7,
} from "@/assets";

const OurWorkGallery = () => {
  return (
    <section className="grid place-items-center">
      <section className="grid gap-4 p-4 xs:grid-cols-2 md:grid-cols-4">
        <h1 className="text-4xl font-extrabold xs:col-span-2 xs:grid xs:grid-cols-2 xs:gap-4 md:col-span-3 md:text-5xl md:grid-cols-3 items-center">
          <span className=" md:col-span-2 text-blue-900/90"> Our Impact</span>
        </h1>

        <p className="xs:row-start-2 xs:col-start-2 xs:self-center md:col-start-1 md:col-span-2 pr-12 text-lg">
          We Focus On Making Our Community Smile And Have An Healthy Life Using
          The Donations and Contributions Made.
        </p>

        <div className="h-auto xs:square">
          <img
            src={CharityEventImage1}
            alt=""
            className="duration-300 object-cover h-[10rem] xs:h-full rounded-xl w-full"
          />
        </div>
        <div className="h-auto xs:square">
          <img
            src={CharityEventImage2}
            alt=""
            className="duration-300 object-cover h-[10rem] xs:h-full rounded-xl w-full"
          />
        </div>
        <div className="h-auto xs:square">
          <img
            src={CharityEventImage3}
            alt=""
            className="duration-300 object-cover h-[10rem] xs:h-full rounded-xl w-full"
          />
        </div>
        <div className="h-auto xs:square md:col-start-2">
          <img
            src={CharityEventImage4}
            alt=""
            className="duration-300 object-cover h-[10rem] xs:h-full rounded-xl w-full"
          />
        </div>
        <div className="h-auto xs:square">
          <img
            src={CharityEventImage5}
            alt=""
            className="duration-300 object-cover h-[10rem] xs:h-full rounded-xl w-full"
          />
        </div>
        <div className="h-auto xs:square">
          <img
            src={CharityEventImage6}
            alt=""
            className="duration-300 object-cover h-[10rem] xs:h-full rounded-xl w-full"
          />
        </div>
        <div className="h-auto xs:square">
          <img
            src={CharityEventImage7}
            alt=""
            className="duration-300 object-cover h-[10rem] xs:h-full rounded-xl w-full"
          />
        </div>
        <p className="self-center md:text-lg md:col-span-2 md:text-center md:px-4 text-blue-900">
          Since you get more joy out of giving joy to others, you should put a
          good deal of thought into the happiness that you are able to give.
        </p>
      </section>
    </section>
  );
};

export default OurWorkGallery;
