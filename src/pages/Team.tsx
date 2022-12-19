import { TeamGallery, Title } from "@/components";
import React from "react";

const Team = () => {
  /**
   * The General UI In This Page Can Be Improved. The Data Should Also Be Dynamic. Let Me Know If Need Be
   */
  return (
    <section>
      {/* Title */}
      <div className="py-5 relative">
        <Title
          title="Meet The Team."
          title_styles="text-[1.5rem] text-blue-900/90"
        />
      </div>

      {/* Gallery */}
      <section>
        <TeamGallery />
      </section>
    </section>
  );
};

export default Team;
