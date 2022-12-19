import { FC, useEffect, useState } from "react";
import { Project } from "@/components";
import { DocumentData } from "firebase/firestore";

interface SliderProps {
  title?: string;
  data: Array<DocumentData>;
}

const Slider: FC<SliderProps> = ({ title, data }) => {
  /**
   * Component States
   */
  const [index, setIndex] = useState<number>(0);

  /**
   * Component Functions
   */

  useEffect(() => {
    const lastIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, data]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="w-full">
      {/* the slider title */}
      {title && (
        <h2 className="text-start text-[0.8rem] font-bold mb-2">{title}</h2>
      )}
      {/* the slider */}
      <section className="h-[28rem] sm:h-[16rem] relative flex justify-center overflow-hidden">
        {data.map((single_project, single_project_index) => {
          // placing all the slides to the right
          let position = "nextSlide";

          if (single_project_index === index) {
            position = "activeSlide";
          }

          if (
            single_project_index === index - 1 ||
            (index === 0 && single_project_index === data.length - 1)
          ) {
            position = "lastSlider";
          }

          return (
            <article
              key={single_project_index}
              className={`absolute top-0 left-0 w-full h-full opacity-0 transition-all duration-300 ease-in ${
                position === "activeSlide" && "opacity-100 translate-x-0"
              } ${position === "nextSlide" && "translate-x-full"} ${
                position === "lastSlide" && "-translate-x-full"
              }`}
            >
              <Project project_data={single_project.data()} />
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default Slider;
