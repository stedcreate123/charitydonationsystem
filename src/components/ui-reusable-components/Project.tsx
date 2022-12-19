import { ProjectInfo } from "@/typings.t";
import { FC, useState } from "react";
import { Button, Dropdown, Icon, ProjectActions } from "@/components";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { show_donate_modal_state } from "@/atoms/ModalAtoms";
import { global_project_state } from "@/atoms/ProjectAtom";
import { LocalStorage } from "@/utils";
import { BsCheck2All, BsThreeDots } from "react-icons/bs";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { useUser } from "@/hooks";
import { compare } from "n-krypta";

interface ProjectProps {
  project_data: ProjectInfo;
}

const Project: FC<ProjectProps> = ({ project_data }) => {
  /**
   * Component States
   */
  const setShowDonateModal = useSetRecoilState(show_donate_modal_state);
  const setGlobalProject = useSetRecoilState(global_project_state);
  const [show_project_action_dropdown, setShowProjectActionDropdown] =
    useState<boolean>(false);
  const { user } = useUser();
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;

  /**
   * Component Functions
   */

  return (
    <section
      className={`border flex flex-col gap-3 px-2 py-3 rounded-md sm:flex-row md:justify-between relative ${
        project_data.status === "inactive"
          ? "h-[28rem] sm:h-[15rem]"
          : " h-[30rem] sm:h-[16rem] lg:h-[17.5rem] overscroll-y-auto scrollbar-hide"
      }`}
    >
      {/* Image */}
      <img
        src={project_data.image}
        alt=""
        className={`object-cover w-full h-[12rem] rounded-2xl sm:w-[15rem] md:w-[25rem] xmd:w-[30rem]  ${
          project_data.status === "inactive"
            ? ""
            : "sm:h-[14.5rem] lg:h-[15.5rem] "
        } `}
      />

      <section
        className={`${
          project_data.status === "inactive" ? "h-[15rem]" : "h-full"
        } relative md:w-full`}
      >
        <div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              {/* Status */}
              {project_data.status === "active" ? (
                <div className="flex items-center border w-fit pl-1 rounded-full h-[1.5rem]">
                  <Icon
                    icon={<BiLockOpen className="text-[1rem]" />}
                    iconWrapperStyles="text-green-500"
                  />
                  <span className="bg-green-400 p-2 rounded-full text-white h-full flex justify-center items-center text-xs uppercase">
                    {project_data.status}
                  </span>
                </div>
              ) : (
                <div className="flex items-center border w-fit pl-1 rounded-full h-[1.5rem]">
                  <Icon
                    icon={<BiLock className="text-[1rem]" />}
                    iconWrapperStyles="text-gray-500"
                  />
                  <span className="bg-gray-400 p-2 rounded-full text-white h-full flex justify-center items-center text-xs uppercase">
                    {project_data.status}
                  </span>
                </div>
              )}

              {/* Target Amount */}
              <div className="flex gap-2 items-center">
                <span className="text-sm bg-red-300 text-white px-3 rounded-full flex items-center justify-center py-2">
                  {project_data.charity_amount_target}{" "}
                  {project_data.amount_unit}
                  <Icon
                    icon={<BsCheck2All className="text-green-500 w-5 h-5" />}
                    iconWrapperStyles={`${
                      project_data.status === "active" ? "hidden" : "block"
                    }`}
                  />
                </span>

                {LocalStorage.getStoreValue("authenticated_user_role") &&
                  compare(
                    "organization",
                    LocalStorage.getStoreValue("authenticated_user_role"),
                    ENCRYPTION_SECRET_KEY!
                  ) && (
                    <div>
                      {project_data.status === "active" && (
                        <div>
                          {user && user?.email === project_data?.org_email && (
                            <Dropdown
                              icon={<BsThreeDots />}
                              dropdown_component={
                                <ProjectActions project={project_data} />
                              }
                              display_state={show_project_action_dropdown}
                              setDisplayState={setShowProjectActionDropdown}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>

            {/* Title */}
            <span className="font-semibold capitalize tracking-wider text-sm">
              {project_data.title}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-500 ml-2 text-sm">
            {project_data.description}
          </p>
        </div>

        {/* Extra Info */}
        <section
          className={`absolute bottom-0 left-0 sm:-bottom-2  md:left-0 lg:bottom-0 w-full ${
            project_data.status === "inactive" ? "hidden" : "flex flex-col "
          }`}
        >
          {/* Dates */}
          <div className="flex flex-row items-center justify-start">
            <span className="bg-gray-200/50 font-bold px-2 rounded-full text-xs whitespace-nowrap w-fit h-fit">
              {format(
                new Timestamp(
                  project_data?.dates?.start_date?.seconds!,
                  project_data?.dates?.start_date?.nanoseconds!
                ).toDate(),
                "EE, MMM d, yyy"
              )}
            </span>

            <span className="uppercase text-gray-900 font-bold">-</span>

            <span className="bg-gray-200/50 px-2 rounded-full text-xs whitespace-nowrap font-bold w-fit h-fit">
              {format(
                new Timestamp(
                  project_data?.dates?.end_date?.seconds,
                  project_data?.dates?.end_date?.nanoseconds
                ).toDate(),
                "EE, MMM d, yyy"
              )}
            </span>
          </div>

          {/* The Donation Button */}
          <div className="lg:flex items-center">
            <div className="flex-1">
              <Button
                title="Donate In ETH"
                button_styles="rounded m-1 px-3  bg-green-500 py-2 w-1/2 lg:w-3/4"
                button_title_wrapper_styles="text-white font-medium mr-2 text-sm"
                purpose={() => {
                  setGlobalProject(project_data);
                  setShowDonateModal(true);
                }}
              />
            </div>

            {/* Current Donation Info */}
            <div className="grid grid-cols-3 gap-2 items-center w-fit bg-green-300/20 px-2 py-2 rounded-full ">
              <div className=" col-span-1">Donated:</div>
              <div className=" col-span-2">
                {project_data?.donated_amount} ETH
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${
            project_data.status === "active" ? "hidden" : "flex justify-center"
          }`}
        >
          <div className="flex py-2 bg-green-500 mt-7 rounded-full px-2 text-sm text-white gap-3">
            <span>Amount Donated:</span>
            {project_data?.donated_amount} ETH
          </div>
        </section>
      </section>
    </section>
  );
};

export default Project;
