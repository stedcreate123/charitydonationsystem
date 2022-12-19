import {
  show_password_reset_state,
  show_register_or_edit_organization_modal_state,
} from "@/atoms/ModalAtoms";
import { Button, Error, InteractiveButton, SpinnerLoader } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { LoginInfo } from "@/typings.t";
import { useUser } from "@/hooks";

const OrganizationLogin = () => {
  /**
   * Component States
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();
  const setShowRegisterOrEditOrganizationModal = useSetRecoilState(
    show_register_or_edit_organization_modal_state
  );
  const setShowPasswordResetModal = useSetRecoilState(
    show_password_reset_state
  );
  const { loading, loginUser } = useUser();

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
              {...register("email", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">
              Enter The Organization Email
            </label>

            {errors["email"] && (
              <Error error_message="Organization Email Is Required." />
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">
              Enter The Organization Password
            </label>

            {errors["password"] && (
              <Error error_message="Organization Password Is Required." />
            )}
          </div>

          <Button
            title={loading ? <SpinnerLoader color="fill-white" /> : "Login"}
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
          title="Create Account"
          link_styles="text-sm uppercase bg-indigo-500 w-full xs:w-fit py-3 rounded-full  text-white hover:bg-indigo-300"
          purpose={() => setShowRegisterOrEditOrganizationModal(true)}
        />
      </div>
    </section>
  );
};

export default OrganizationLogin;
