import { auth, db } from "@/firebase";
import { LocalStorage, Notification } from "@/utils";
import { encrypt, decrypt, compare } from "n-krypta";
import {
  onAuthStateChanged,
  User,
  signOut,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import {
  show_register_or_edit_donor_modal_state,
  show_register_or_edit_organization_modal_state,
} from "@/atoms/ModalAtoms";
import { useNavigate } from "react-router-dom";
import { useDisconnect } from "wagmi";
import { format } from "date-fns";
import ReactGa from "react-ga";
const useUser = () => {
  /**
   * Hook States
   */
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const setShowRegisterOrEditDonorModal = useSetRecoilState(
    show_register_or_edit_donor_modal_state
  );
  const showRegisterOrEditOrganizationModal = useSetRecoilState(
    show_register_or_edit_organization_modal_state
  );
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;

  /**
   * Hook Functions
   */

  /**
   * Persisting A User
   */
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (user?.uid) {
        const docSnap = await getDoc(doc(db, "users", user?.uid));

        LocalStorage.storeValue(
          "authenticated_user_role",
          encrypt(docSnap.data()?.user_info?.role, ENCRYPTION_SECRET_KEY!)
        );

        docSnap.data()?.user_info?.role === "donor"
          ? LocalStorage.storeValue(
              "donor_info",
              encrypt(
                {
                  dateofbirth: docSnap.data()?.user_info?.date_of_birth,
                  region: docSnap.data()?.user_info?.region,
                },
                ENCRYPTION_SECRET_KEY!
              )
            )
          : LocalStorage.storeValue(
              "org_info",
              encrypt(
                {
                  name: docSnap.data()?.user_info?.organization_info?.name,
                  description:
                    docSnap.data()?.user_info?.organization_info?.description,
                  phonenumber:
                    docSnap.data()?.user_info?.organization_info?.phone_number,
                },
                ENCRYPTION_SECRET_KEY!
              )
            );
      }
    };

    if (user) {
      getUserData();
    }
  }, [user]);

  /**
   * Creating A User (Donor or Organization) In Database (NB: Firebase)
   * => The Functions Below Can Also Be Called SignUp. I Have Used RegisterUser To Maintain Consistency
   */
  const registerUser = async (
    email: string,
    password: string,
    role: "donor" | "organization",
    organization_info?: {
      name: string;
      description: string;
      phone_number: string;
    },
    donor_info?: {
      occupation: string;
      age: string;
    }
  ) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        try {
          await setDoc(doc(db, "users", result?.user!?.uid), {
            user_info: {
              role: role,
              organization_info: {
                name: organization_info?.name,
                description: organization_info?.description,
                phone_number: organization_info?.phone_number,
              },
            },
          }).then(() => {
            setUser(result?.user);
            Notification.successNotification("Account Created Successfully.");
            showRegisterOrEditOrganizationModal(false);
            navigate("/");
          });
        } catch (error) {
          getAuth().currentUser?.delete();
          Notification.errorNotification("Something Went Wrong.Try again.");
          setShowRegisterOrEditDonorModal(false);
          return;
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Notification.errorNotification(
            "The Email Has Already Been Used By Another User."
          );
          return;
        } else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
          Notification.errorNotification(
            "Password Must Be 6 or More Character."
          );
          return;
        } else if (error.code === "auth/network-request-failed") {
          Notification.errorNotification("Please Connect To A Stable network.");
          return;
        } else {
          Notification.errorNotification(error.message);
          return;
        }
      })
      .finally(() => setLoading(false));
  };

  const registerDonor = async (
    email: string,
    password: string,
    role: "donor",
    donor_info?: {
      region: string;
      date_of_birth: Date;
    }
  ) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        try {
          await setDoc(doc(db, "users", result?.user!?.uid), {
            user_info: {
              role: role,
              region: donor_info?.region,
              date_of_birth: donor_info?.date_of_birth,
            },
          }).then(() => {
            setUser(result?.user);
            Notification.successNotification("Account Created Successfully.");
            setShowRegisterOrEditDonorModal(false);
            navigate("/");
          });
        } catch (error) {
          getAuth().currentUser?.delete();
          Notification.errorNotification("Something Went Wrong.Try again.");
          setShowRegisterOrEditDonorModal(false);
          return;
        }
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Notification.errorNotification(
            "The Email Has Already Been Used By Another User."
          );
          return;
        } else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
          Notification.errorNotification(
            "Password Must Be 6 or More Character."
          );
          return;
        } else if (error.code === "auth/network-request-failed") {
          Notification.errorNotification("Please Connect To A Stable network.");
          return;
        } else {
          Notification.errorNotification(error.message);
          return;
        }
      })
      .finally(() => setLoading(false));
  };

  const editDonor = async (date_of_birth: Date, region: string) => {
    await updateDoc(doc(db, "users", user?.uid!), {
      user_info: {
        role: "donor",
        region: region,
        date_of_birth: date_of_birth,
      },
    }).then(() => {
      LocalStorage.storeValue(
        "donor_info",
        encrypt(
          {
            dateofbirth: format(date_of_birth, "EE, MMM d, yyy"),
            region: region,
          },
          ENCRYPTION_SECRET_KEY!
        )
      );
    });
  };

  const editOrganization = async (
    name: string,
    description: string,
    phone_number: string
  ) => {
    await updateDoc(doc(db, "users", user?.uid!), {
      user_info: {
        role: "organization",
        organization_info: {
          name: name,
          description: description,
          phone_number: phone_number,
        },
      },
    }).then(() => {
      LocalStorage.storeValue(
        "org_info",
        encrypt(
          {
            name: name,
            description: description,
            phonenumber: phone_number,
          },
          ENCRYPTION_SECRET_KEY!
        )
      );
    });
  };

  /**
   * Login A User To The System (Donor Or Organization)
   * => The Functions Below Can Also Be Called SignIn. I Have Used LoginUser To Maintain Consistency
   */
  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response?.user);
        Notification.successNotification(
          "You Have Logged In Successfully.Welcome Back."
        );
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email")
          Notification.errorNotification("Invalid Email.Try Again.");
        else if (error.code === "auth/wrong-password")
          Notification.errorNotification("Wrong Password.Try Again.");
        else if (error.code === "auth/user-not-found")
          Notification.errorNotification(
            "We cannot find your account in our system.Please create one and try again."
          );
        else Notification.errorNotification(error.message);

        return;
      })
      .finally(() => setLoading(false));
  };

  const sendPasswordResetEmailToUser = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email).then(() =>
        Notification.successNotification(
          "Email Send. Please Check your Inbox Or Scam folder."
        )
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  /**
   * Logout A User From The System (Donor Or Organization)
   */
  const logoutUser = async () => {
    ReactGa.event({
      category: "logout",
      action: "logging of the site",
      label: "Log Out Label",
    });

    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        LocalStorage.removeStoreItem("authenticated_user_role");
        LocalStorage.removeStoreItem("donor_info");
        LocalStorage.removeStoreItem("org_info");
        disconnect();
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        Notification.errorNotification(error.message);
        return;
      })
      .finally(() => setLoading(false));
  };

  /**
   * Memorizing Specific Values To Prevent Rerenders And Increase Faster Load Time (One Can Also Choose To Ignore This)
   */
  const memoedValue = useMemo(
    () => ({
      user,
      registerUser,
      loginUser,
      loading,
      logoutUser,
      registerDonor,
      sendPasswordResetEmailToUser,
      editDonor,
      editOrganization,
    }),
    [user, loading]
  );

  return memoedValue;
};

export default useUser;
