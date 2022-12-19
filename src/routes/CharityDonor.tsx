import { LocalStorage } from "@/utils";
import { compare } from "n-krypta";
import { ReactElement, FC } from "react";
import { Navigate } from "react-router-dom";

interface CharityDonorProps {
  children: ReactElement;
}

const CharityDonor: FC<CharityDonorProps> = ({ children }) => {
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  /**
   * Push The Current User To Not Found If The Current User Does Not Have The Defines Role
   */
  if (
    !compare(
      "donor",
      LocalStorage.getStoreValue("authenticated_user_role"),
      ENCRYPTION_SECRET_KEY!
    )
  )
    return <Navigate to="/notfound" replace />;

  /**
   * Return The Page If The Current User Passes The Check
   */

  return children;
};

export default CharityDonor;
