import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export type Route = {
  title?: string;
  route: string;
  icon?: ReactNode;
};

export type TabsData = {
  label?: string;
  icon?: ReactNode;
  content?: ReactNode;
};

export type Role = "donor" | "organization";

export type Component = "Input" | "Select" | "Checkbox" | "TextArea";
export type Type = "text" | "password" | "textarea" | "number" | "email";

export type Input = {
  name: string;
  label: string;
  required?: boolean;
  error_message: string;
  component: Component;
  type: Type;
};

interface Info {
  email: string;
  password: string;
}

export interface DonorRegistrationInfo extends Info {
  region: string;
  date_of_birth: Date;
}

export interface OrganizationRegistrationInfo extends Info {
  name: string;
  description: string;
  phone_number: string;
}

export interface LoginInfo extends Info {}

export type ProjectInfo = {
  id?: number;
  title: string;
  description: string;
  image: string;
  dates: {
    start_date?: any;
    end_date: any;
  };
  charity_amount_target: string | number;
  donated_amount?: number;
  status?: "active" | "inactive";
  charity_address?: string;
  amount_unit?: "ETH"; // Just Incase You Need To Add More Units (coins types)
  org_email?: string;
};

export type Image = {
  id: number;
  image: string;
};

export type DonationData = {
  donation_amount: number;
  donor: string;
  project_id: number;
  timestamp: Timestamp;
};
