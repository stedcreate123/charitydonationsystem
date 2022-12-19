import { Input } from "@/typings.t";

const useOrganization = () => {
  /**
   * Hook States
   */
  const organization_inputs: Input[] = [
    {
      name: "name",
      label: "Organization Name.",
      required: true,
      error_message: "Organization Name Is Required.",
      component: "Input",
      type: "text",
    },
    {
      name: "description",
      label: "Organization Description.",
      required: true,
      error_message: "Organization Description Is Required.",
      component: "TextArea",
      type: "textarea",
    },
    {
      name: "phone_number",
      label: "Organization Phone Number.",
      required: true,
      error_message: "Organization Phone Is Required.",
      component: "Input",
      type: "number",
    },
    {
      name: "email",
      label: "Organization Email.",
      required: true,
      error_message: "Organization Email Is Required.",
      component: "Input",
      type: "email",
    },
    {
      name: "password",
      label: "Organization Password.",
      required: true,
      error_message: "Organization Password Is Required.",
      component: "Input",
      type: "password",
    },
  ];

  return { organization_inputs };
};

export default useOrganization;
