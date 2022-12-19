import { useEffect, useRef, useState } from "react";
import { Button, Error, Icon, ModalHeader, SpinnerLoader } from "@/components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  global_project_state,
  is_editing_project_state,
} from "@/atoms/ProjectAtom";
import { show_create_or_edit_project_modal_state } from "@/atoms/ModalAtoms";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectInfo } from "@/typings.t";
import { HiOutlinePhotograph, HiX } from "react-icons/hi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { Notification } from "@/utils";
import { useProject } from "@/hooks";
import { useAccount } from "wagmi";
import { Timestamp } from "firebase/firestore";

const CreateOrEditProject = () => {
  /**
   * Component States
   */
  const [is_editing_project, setIsEditingProject] = useRecoilState(
    is_editing_project_state
  );
  const setShowCreateOrEditProjectModal = useSetRecoilState(
    show_create_or_edit_project_modal_state
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectInfo>();
  const [selected_project_file, setSelectedProjectFile] = useState<
    string | null
  >(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState(new Date());
  const { is_creating, createProject, editProject } = useProject();
  const { address } = useAccount();
  const global_project = useRecoilValue(global_project_state);

  /**
   * Component Functions
   */
  const addImageToProject = (files?: any) => {
    const reader = new FileReader();
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedProjectFile(readerEvent.target.result);
    };
  };

  const handleDateSelect = (date: Date) => {
    setDate(date);
  };

  const onSubmit: SubmitHandler<ProjectInfo> = async ({
    title,
    description,
    charity_amount_target,
  }) => {
    /**
     * Some Input Validation To Values Not Validated By The useForm Hook (extra work but its worth it)
     */

    if (selected_project_file === null) {
      Notification.errorNotification("The Project Image Is Required.");
      return;
    }

    if (charity_amount_target === "0" || charity_amount_target < 0) {
      Notification.errorNotification("Enter A Valid Amount.");
      return;
    }

    if (address) {
      if (is_editing_project) {
        editProject(
          {
            title,
            description,
            dates: {
              start_date: global_project?.dates?.start_date,
              end_date: date,
            },
            image: selected_project_file,
            charity_amount_target: charity_amount_target,
          },
          global_project?.id?.toString()!
        );
      } else {
        await createProject({
          title,
          description,
          dates: { start_date: new Date(), end_date: date },
          image: selected_project_file,
          charity_amount_target: charity_amount_target,
          status: "active",
          amount_unit: "ETH",
        }).then(() => {
          reset({
            title: "",
            description: "",
            charity_amount_target: "",
          });

          setDate(new Date());
          setSelectedProjectFile(null);
        });
      }
    } else {
      Notification.errorNotification(
        "Please Connect To A MetaMask Account First."
      );
      return;
    }
  };

  useEffect(() => {
    if (global_project && is_editing_project) {
      reset({
        title: global_project?.title,
        description: global_project?.description,
        charity_amount_target: global_project?.charity_amount_target,
      });

      setSelectedProjectFile(global_project?.image);
      setDate(
        new Timestamp(
          global_project.dates?.end_date?.seconds,
          global_project?.dates?.end_date?.nanoseconds
        ).toDate()
      );
    }
  }, [global_project]);

  return (
    <section>
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setIsEditingProject(false);
            setShowCreateOrEditProjectModal(false);
          }}
          is_editing={is_editing_project}
          create_title="Creating A New Project."
          edit_title="Editing Project."
        />
      </section>

      {/* Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-1 py-2">
        <section className="flex flex-col gap-4 h-[20rem] py-3 overflow-y-scroll scrollbar-hide">
          {/* Title */}
          <div className="input-group">
            <input
              type="text"
              {...register("title", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">Title</label>

            {errors["title"] && (
              <Error error_message="Project Title Is Required." />
            )}
          </div>

          {/* Description */}
          <div className="input-group">
            <textarea
              {...register("description", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">Description</label>

            {errors["description"] && (
              <Error error_message="Project Description Is Required." />
            )}
          </div>

          {selected_project_file && (
            <div className="relative border rounded-md">
              <Icon
                icon={<HiX className="text-white h-5" />}
                iconWrapperStyles="absolute w-8 h-8 bg-red-300 hover:bg-red-500 bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                purpose={() => setSelectedProjectFile(null)}
              />

              <img
                src={selected_project_file}
                alt=""
                className="rounded-2xl max-h-80 object-contain w-full"
              />
            </div>
          )}

          {/* Image */}
          <div className="relative">
            <span className="absolute -top-[10px] left-[8px] rounded-full px-2 z-50 bg-white text-gray-900/50  border">
              Image
            </span>
            <div
              className="border py-2 flex justify-center rounded-md"
              onClick={() => filePickerRef?.current?.click()}
            >
              <HiOutlinePhotograph className="text-[2rem] text-[#1d9bf0]" />
              <input
                type="file"
                hidden
                onChange={(event) => addImageToProject(event.target.files)}
                ref={filePickerRef}
              />
            </div>
          </div>

          {/* Dates Range */}
          <div className="w-full h-fit relative border rounded-md flex justify-center items-center">
            <span className="absolute -top-[10px] left-[8px] rounded-full px-2 z-50 bg-white text-gray-900/50  border">
              The Expected Last Date
            </span>

            <Calendar
              date={date}
              onChange={handleDateSelect}
              minDate={new Date()}
            />
          </div>

          {/* Funds */}
          <div className="input-group">
            <input
              type="number"
              {...register("charity_amount_target", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">
              Target Amount (In Crypto)
            </label>

            {errors["charity_amount_target"] && (
              <Error error_message="The Target Amount Is Required." />
            )}
          </div>
        </section>

        <div className="flex justify-end mt-4 mr-3">
          <Button
            title={
              is_creating ? (
                <SpinnerLoader color="fill-white" />
              ) : is_editing_project ? (
                "Update"
              ) : (
                "Create"
              )
            }
            type="submit"
            button_styles="primary_button "
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditProject;
