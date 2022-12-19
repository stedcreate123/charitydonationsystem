import { show_register_or_edit_organization_modal_state } from "@/atoms/ModalAtoms";
import { is_editing_organizationState } from "@/atoms/OrganizationAtom";
import { Button, Error, ModalHeader, SpinnerLoader } from "@/components";
import { useOrganization, useUser } from "@/hooks";
import { OrganizationRegistrationInfo } from "@/typings.t";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { LocalStorage } from "@/utils";
import { decrypt } from "n-krypta";

const RegisterOrEditOrganization = () => {
  /**
   * Component States
   */
  const [is_editing_organization, setIsEditingOrganization] = useRecoilState(
    is_editing_organizationState
  );
  const setShowRegisterOrEditOrganizationModal = useSetRecoilState(
    show_register_or_edit_organization_modal_state
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrganizationRegistrationInfo>();
  const { registerUser, loading, editOrganization } = useUser();
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const org_info = LocalStorage.getStoreValue("org_info")
    ? decrypt(LocalStorage.getStoreValue("org_info"), ENCRYPTION_SECRET_KEY!)
    : "";

  /**
   * Component Functions
   */
  const onSubmit: SubmitHandler<OrganizationRegistrationInfo> = async ({
    name,
    description,
    phone_number,
    email,
    password,
  }) => {
    is_editing_organization
      ? await editOrganization(name, description, phone_number).then(() => {
          setIsEditingOrganization(false);
          setShowRegisterOrEditOrganizationModal(false);
          window.location.reload();
        })
      : await registerUser(email, password, "organization", {
          name,
          description,
          phone_number,
        }).then(() => {
          reset({
            email: "",
            description: "",
            name: "",
            password: "",
            phone_number: "",
          });
        });
  };

  useEffect(() => {
    if (is_editing_organization) {
      reset({
        description: org_info.description,
        name: org_info.name,
        phone_number: org_info.phonenumber,
      });
    }
  }, [is_editing_organization]);

  return (
    <section>
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setIsEditingOrganization(false);
            setShowRegisterOrEditOrganizationModal(false);
          }}
          is_editing={is_editing_organization}
          edit_title="Editing Organization Information,"
          create_title="Registering Organization."
        />
      </section>

      {/* Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-2 py-2">
        <section className="flex flex-col gap-4 h-[15rem] py-3  overflow-y-scroll scrollbar-hide">
          {/* An Issue With TS I Cannot Solve At The Moment.Pains Me To Write This Code As Below But I Find The Solution Later. */}
          <div className="input-group">
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">Organization Name.</label>

            {errors["name"] && (
              <Error error_message="Organization Name Is Required." />
            )}
          </div>

          <div className="input-group">
            <input
              type="text"
              {...register("description", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">
              Organization Description.
            </label>

            {errors["description"] && (
              <Error error_message="Organization Description Is Required." />
            )}
          </div>

          <div className="input-group">
            <input
              type="number"
              {...register("phone_number", {
                required: true,
              })}
              className="input"
            />

            <label className="placeholder border">
              Organization Phone Number.
            </label>

            {errors["phone_number"] && (
              <Error error_message="Organization Phone Is Required." />
            )}
          </div>

          <div
            className={`input-group ${
              is_editing_organization ? "hidden" : "block"
            }`}
          >
            <input
              type="email"
              {...register("email", {
                required: !is_editing_organization,
              })}
              className="input"
            />

            <label className="placeholder border">Organization Email.</label>

            {errors["email"] && (
              <Error error_message="Organization Email Is Required." />
            )}
          </div>

          <div
            className={`input-group ${
              is_editing_organization ? "hidden" : "block"
            }`}
          >
            <input
              type="password"
              {...register("password", {
                required: !is_editing_organization,
              })}
              className="input"
            />

            <label className="placeholder border">Organization Password.</label>

            {errors["password"] && (
              <Error error_message="Organization  Password Is Required." />
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

export default RegisterOrEditOrganization;
