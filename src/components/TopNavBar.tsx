import { show_sidenav_bar_state } from "@/atoms/SideNavBarAtom";
import { ExtraLinks, Icon, Logo, MainLinks } from "@/components";
import { useRecoilState } from "recoil";
import { HiX } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";

const TopNavBar = () => {
  /**
   * Component States
   */
  const [show_sidenav_bar, setShowSidenavBar] = useRecoilState(
    show_sidenav_bar_state
  );

  return (
    <div className="max-w-[1200px] mx-auto bg-white w-full h-full flex justify-between items-center px-4 rounded-xl">
      {/* Logo */}
      <Logo />

      {/* Links */}
      <section className="flex gap-3 items-center">
        {/* Hamburger To Display The SideNabBar In Small Screens */}
        <div className="lg:hidden">
          <Icon
            icon={show_sidenav_bar ? <HiX /> : <FiMenu />}
            iconWrapperStyles="text-[1.5rem] duration-300"
            purpose={() => setShowSidenavBar((prev) => !prev)}
          />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {/* Links */}
          <MainLinks container_styles="flex flex-row gap-2 items-center" />

          {/* Extra Links */}
          <ExtraLinks container_styles="space-x-12 flex flex-row h-fit items-center" />
        </div>
      </section>
    </div>
  );
};

export default TopNavBar;
