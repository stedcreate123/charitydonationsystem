import {
  show_password_reset_state,
  show_register_or_edit_donor_modal_state,
} from "@/atoms/ModalAtoms";
import { Button, Error, InteractiveButton, SpinnerLoader } from "@/components";
import { useUser } from "@/hooks";
import { LoginInfo } from "@/typings.t";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const DonorLogin = () => {
  /**
   * Component States
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();
  const setShowRegisterOrEditDonorModal = useSetRecoilState(
    show_register_or_edit_donor_modal_state
  );
  const setShowPasswordResetModal = useSetRecoilState(
    show_password_reset_state
  );

  const { loginUser, loading } = useUser();

  /**
   * Component Functions
   */
  const onSubmit: SubmitHandler<LoginInfo> = async ({ email, password }) => {
    await loginUser(email, password);
  };

  return (
    <section className="flex flex-col gap-3 md:flex-row md:px-2 md:gap-4 lg:pt-10 duration-300 md:items-center">
      {/* 
      The Charity Organization Will Have To Enter An Email And A Password To Gain Access
       => This Info Is Provided During Registration
       => There Will Later Connect There Account To A MetaMask Account Holding The Donations
     */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 px-2 py-6 border-2 border-gray-200 rounded-lg flex-1"
        >
          <div className="input-group">
            <input
              type="text"
              placeholder=""
              {...register("email", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">Enter Email</label>

            {errors["email"] && <Error error_message="Email Is Required." />}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder=""
              {...register("password", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">Enter Password</label>

            {errors["password"] && (
              <Error error_message="Password Is Required." />
            )}
          </div>

          <Button
            title={loading ? <SpinnerLoader color="fill-[#ff9900]" /> : "Login"}
            button_styles="primary_button"
            type="submit"
          />
        </form>

        {/* Forgot Password Button */}
        <div className="mt-5 flex justify-center">
          <Button
            title="Forgot Password?"
            button_styles="text-blue-500 hover:underline"
            type="submit"
            purpose={() => setShowPasswordResetModal(true)}
          />
        </div>
      </div>

      <div className="mt-10 md:mt-0 flex flex-col gap-4 items-center">
        <span className="text-lg">Don't Have An Account Yet?.</span>
        {/* 
        To Register Page If There Have No Account Yet
      */}
        <InteractiveButton
          title="Create Donor Account"
          link_styles="text-sm uppercase bg-indigo-500 w-full xs:w-fit py-3 rounded-full  text-white hover:bg-indigo-300"
          purpose={() => setShowRegisterOrEditDonorModal(true)}
        />
      </div>
    </section>
  );
};

export default DonorLogin;
