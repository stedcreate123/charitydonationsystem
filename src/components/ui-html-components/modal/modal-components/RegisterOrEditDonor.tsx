import { is_editing_donor_state } from "@/atoms/DonorAtom";
import { show_register_or_edit_donor_modal_state } from "@/atoms/ModalAtoms";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button, Error, ModalHeader, SpinnerLoader } from "@/components";
import { DonorRegistrationInfo } from "@/typings.t";
import { useUser } from "@/hooks";
import { Calendar } from "react-date-range";
import { useState, useEffect } from "react";
import { LocalStorage } from "@/utils";
import { Timestamp } from "firebase/firestore";
import { decrypt } from "n-krypta";

const RegisterOrEditDonor = () => {
  /**
   * Component States
   */
  const [is_editing_donor, setIsEditingDonor] = useRecoilState(
    is_editing_donor_state
  );
  const setShowRegisterOrEditDonorModal = useSetRecoilState(
    show_register_or_edit_donor_modal_state
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorRegistrationInfo>();
  const yesterday = new Date(Date.now() - 864e5);
  const [date_of_birth, setDateOfBirth] = useState(yesterday);
  const { registerDonor, loading, editDonor } = useUser();
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const donor_info = LocalStorage.getStoreValue("donor_info")
    ? decrypt(LocalStorage.getStoreValue("donor_info"), ENCRYPTION_SECRET_KEY!)
    : "";

  /**
   * Component Function
   */
  const onSubmit: SubmitHandler<DonorRegistrationInfo> = async ({
    email,
    password,
    region,
  }) => {
    is_editing_donor
      ? await editDonor(date_of_birth, region).then(() => {
          setIsEditingDonor(false);
          setShowRegisterOrEditDonorModal(false);
          window.location.reload();
        })
      : await registerDonor(email, password, "donor", {
          region,
          date_of_birth,
        }).then(() => {
          reset({
            email: "",
            region: "",
            password: "",
          });
          setDateOfBirth(yesterday);
        });
  };

  const handleDateSelect = (date: Date) => setDateOfBirth(date);

  useEffect(() => {
    if (is_editing_donor) {
      reset({
        region: donor_info.region,
      });

      setDateOfBirth(
        new Timestamp(
          donor_info.dateofbirth?.seconds,
          donor_info.dateofbirth?.nanoseconds
        ).toDate()
      );
    }
  }, [is_editing_donor]);

  return (
    <section>
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setIsEditingDonor(false);
            setShowRegisterOrEditDonorModal(false);
          }}
          is_editing={is_editing_donor}
          edit_title="Editing Account Information,"
          create_title="Creating Account."
        />
      </section>

      {/* Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-2 py-2 space-y-1">
        <section className="flex flex-col gap-4 h-[21rem] py-3  overflow-y-scroll scrollbar-hide">
          <div
            className={`input-group ${is_editing_donor ? "hidden" : "block"}`}
          >
            <input
              type="email"
              placeholder=""
              {...register("email", {
                required: !is_editing_donor,
              })}
              className="input"
            />

            <label className="placeholder border">Enter Your Email</label>

            {errors["email"] && <Error error_message="Email Is Required." />}
          </div>

          <div className="input-group">
            <input
              type="occupation"
              placeholder=""
              {...register("region", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">Enter Your Region</label>

            {errors["region"] && (
              <Error error_message="Your current region is required." />
            )}
          </div>

          <div className="w-full h-fit relative border rounded-md flex justify-center items-center">
            <span className="absolute -top-[10px] left-[8px] rounded-full px-2 z-50 bg-white text-gray-900/50  border">
              Your Date Of Birth
            </span>

            <Calendar
              date={date_of_birth}
              onChange={handleDateSelect}
              maxDate={yesterday}
            />

            {errors["date_of_birth"] && (
              <Error error_message="Your Date Of Birth Is Required" />
            )}
          </div>

          <div
            className={`input-group ${is_editing_donor ? "hidden" : "block"}`}
          >
            <input
              type="password"
              placeholder=""
              {...register("password", {
                required: !is_editing_donor,
              })}
              className="input"
            />

            <label className="placeholder border">Enter Your Password</label>

            {errors["password"] && (
              <Error error_message="Password Is Required." />
            )}
          </div>
        </section>

        <div className="flex justify-end">
          <Button
            title={loading ? <SpinnerLoader color="fill-white" /> : "Save"}
            type="submit"
            button_styles="primary_button "
          />
        </div>
      </form>
    </section>
  );
};

export default RegisterOrEditDonor;
