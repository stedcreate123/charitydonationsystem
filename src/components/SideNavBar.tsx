import { show_sidenav_bar_state } from "@/atoms/SideNavBarAtom";
import { useRef } from "react";
import { useClickOutside } from "react-haiku";
import { useRecoilState } from "recoil";
import { ExtraLinks, Logo, MainLinks } from "@/components";

const SideNavBar = () => {
  /**
   * Component States
   */
  const [show_sidenav_bar, setShowSidenavBar] = useRecoilState(
    show_sidenav_bar_state
  );
  const sidenav_bar_ref = useRef<HTMLElement>(null);

  /**
   * Component Functions
   */
  useClickOutside(sidenav_bar_ref, () => setShowSidenavBar(false));

  return (
    <aside
      className={`${
        show_sidenav_bar ? "show_sidnavbar sidenavbar" : "sidenavbar"
      } py-2 px-3  lg:hidden 
      `}
      ref={sidenav_bar_ref}
    >
      <div className="mt-[2rem] space-y-16">
        <div className="space-y-5">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Logo />
          </div>

          {/* Links */}
          <MainLinks container_styles="flex flex-col gap-2 " />
        </div>

        {/* Extra Links */}
        <ExtraLinks container_styles=" w-full space-y-5" />
      </div>
    </aside>
  );
};

export default SideNavBar;
