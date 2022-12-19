import { GeneralUtils } from "@/utils";
import React from "react";

const Gallery = () => {
  return (
    <section className="grid place-items-center">
      <section className="grid gap-4 p-4 xs:grid-cols-2 md:grid-cols-4">
        <h1 className="text-4xl font-extrabold xs:col-span-2 xs:grid xs:grid-cols-2 xs:gap-4 md:col-span-3 md:text-5xl md:grid-cols-3 items-center">
          <span className=" md:col-span-2"></span>
        </h1>

        <p className="xs:row-start-2 xs:col-start-2 xs:self-center md:col-start-1 md:col-span-2 pr-12 text-lg text-gray-400">
          To Ensure A Team That Can Be Trusted And Up To The Task, Each Member
          Clearly Vetted And Accessed For All Scenario's.
        </p>

        {/* Images of Members */}
        <div className="h-[10rem] xs:h-auto xs:square mb-4">
          <div className="border h-full  rounded-[2rem] flex justify-center items-center">
            <img
              src={GeneralUtils.generateAvatar(
                "Chong Tze Wee",
                "abcab9",
                "2C7A51",
                true
              )}
              alt=""
              className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
            />
          </div>
          <span className="ml-2">Chong Tze Wee - CEO</span>
        </div>
        <div className="border xs:h-auto xs:square rounded-[2rem] flex justify-center items-center">
          <img
            src={GeneralUtils.generateAvatar(
              "Executive Member",
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
          />
        </div>
        <div className="border xs:h-auto xs:square rounded-[2rem] flex justify-center items-center">
          <img
            src={GeneralUtils.generateAvatar(
              "Executive Member",
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
          />
        </div>
        <div className="border xs:h-auto xs:square rounded-[2rem] flex justify-center items-center">
          <img
            src={GeneralUtils.generateAvatar(
              "Member",
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
          />
        </div>
        <div className="border xs:h-auto xs:square rounded-[2rem] flex justify-center items-center">
          <img
            src={GeneralUtils.generateAvatar(
              "Member",
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
          />
        </div>
        <div className="border xs:h-auto xs:square rounded-[2rem] flex justify-center items-center">
          <img
            src={GeneralUtils.generateAvatar(
              "Member",
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
          />
        </div>
        <div className="border xs:h-auto xs:square rounded-[2rem] flex justify-center items-center">
          <img
            src={GeneralUtils.generateAvatar(
              "Member",
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
          />
        </div>
        <div className="border xs:h-auto xs:square rounded-[2rem] flex justify-center items-center">
          <img
            src={GeneralUtils.generateAvatar(
              "Member",
              "abcab9",
              "2C7A51",
              true
            )}
            alt=""
            className="rounded-full flex-shrink-0 h-[10rem] w-[10rem] "
          />
        </div>

        <p className="self-center md:text-lg md:col-span-2 md:text-center md:px-4 text-blue-900">
          We are always happy and ready to devote our time, money and talents to
          the citizens of MALAYSIA and Beyond if need be, for the benefit of our
          community and the society has a whole.
        </p>
      </section>
    </section>
  );
};

export default Gallery;
