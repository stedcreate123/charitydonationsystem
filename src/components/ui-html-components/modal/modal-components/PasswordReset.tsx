import { show_password_reset_state } from "@/atoms/ModalAtoms";
import { useSetRecoilState } from "recoil";
import { Button, Error } from "@/components";
import ModalHeader from "../ModalHeader";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/hooks";

const PasswordReset = () => {
  /**
   * Components States
   */
  const setShowPasswordResetModal = useSetRecoilState(
    show_password_reset_state
  );
  const { sendPasswordResetEmailToUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailReset>();

  type EmailReset = {
    email: string;
  };

  /**
   * Component Functions
   */
  const onSubmit: SubmitHandler<EmailReset> = async ({ email }) => {
    await sendPasswordResetEmailToUser(email).then(() => {
      reset({ email: "" });
      setShowPasswordResetModal(false);
    });
  };

  return (
    <section>
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setShowPasswordResetModal(false);
          }}
          is_editing={false}
          create_title="Resetting Your Password."
          edit_title=""
        />
      </section>

      {/* Email Input Field */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-1 py-2 flex flex-col gap-8"
      >
        <section className="mt-2">
          {/* Title */}
          <div className="input-group">
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">Email</label>

            {errors["email"] && (
              <Error error_message="Enter The Email You Registered The Account With." />
            )}
          </div>
        </section>

        <div className="flex justify-end px-3">
          <Button
            title="Send Reset Password Email"
            type="submit"
            button_styles="primary_button"
          />
        </div>
      </form>
    </section>
  );
};

export default PasswordReset;
