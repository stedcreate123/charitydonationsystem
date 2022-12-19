import { show_donate_modal_state } from "@/atoms/ModalAtoms";
import { global_project_state } from "@/atoms/ProjectAtom";
import { Error, ModalHeader } from "@/components";
import { LocalStorage, Notification } from "@/utils";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import { BigNumber } from "ethers";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@/hooks";
import { decrypt } from "n-krypta";

const Donate = () => {
  /**
   * Component States
   */
  const {
    register,
    reset,
    formState: { errors },
  } = useForm<{ address: string; donation_amount: number }>();
  const [global_project, setGlobalProject] =
    useRecoilState(global_project_state);
  const setShowDonateModal = useSetRecoilState(show_donate_modal_state);
  const [error_message, setErrorMessage] = useState("");
  const [value, setValue] = useState<number>(0);
  const { isConnected } = useAccount();
  const { config, error } = usePrepareSendTransaction({
    request: {
      to: global_project?.charity_address!,
      value: value && BigNumber.from(value),
    },
    onError(error) {
      setErrorMessage("Please Ensure You have Enough Funds In Your Wallet.");

      return;
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const ENCRYPTION_SECRET_KEY = process.env.REACT_APP_ENCRYPTION_SECRET_KEY;
  const donor_info = LocalStorage.getStoreValue("donor_info")
    ? decrypt(LocalStorage.getStoreValue("donor_info"), ENCRYPTION_SECRET_KEY!)
    : undefined;

  const { user } = useUser();
  const { sendTransaction, error: back_end_error } = useSendTransaction({
    ...config,
    onError(error) {
      setErrorMessage(
        "You Either Rejected The Transaction Or The Transaction Did Not Succeed."
      );
    },
    onSuccess(data) {
      /**
       * Adding the Details Of The Transaction To Firebase
       */
      /**
       * Updating The Projects Donated Amount
       */
      updateProjectDetails();
      /**
       * Clearing States
       */
      setValue(0);
      setGlobalProject(null);
      Notification.successNotification(
        "Transaction Was Successful.Thank you For Your Donation."
      );
      setErrorMessage("");
      setShowDonateModal(false);
    },
  });

  /**
   * Component Functions
   */
  useEffect(() => {
    if (global_project?.charity_address) {
      reset({
        address: global_project?.charity_address,
      });
    }
  }, [global_project]);

  const updateProjectDetails = async () => {
    try {
      await addDoc(collection(db, "donations"), {
        donor: user?.uid,
        project_id: global_project?.id,
        project_title: global_project?.title,
        project_status: global_project?.status,
        donation_amount_in_MY: value,
        donation_amount_in_CRYPTO: value * 0.00018,
        region: donor_info.region,
        timestamp: serverTimestamp(),
        org_email: global_project?.org_email,
        donor_email: user?.email,
      }).then(async () => {
        await updateDoc(doc(db, "projects", global_project?.id?.toString()!), {
          donated_amount: value * 0.00018 + global_project?.donated_amount!,
          status:
            global_project?.donated_amount! >=
            global_project?.charity_amount_target!
              ? "inactive"
              : global_project?.status,
        }).then(async () => {
          const doc_ref = doc(db, "projects", global_project?.id?.toString()!);

          const doc_span = await getDoc(doc_ref);
          await updateDoc(doc_ref, {
            status:
              doc_span.data()?.donated_amount! >=
              doc_span.data()?.charity_amount_target!
                ? "inactive"
                : doc_span.data()?.status,
          }).then(() => {
            console.log("done");
          });
        });
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <section className="p-2 relative h-[15rem]">
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setGlobalProject(null);
            setErrorMessage("");
            setValue(0);
            setShowDonateModal(false);
          }}
          is_editing={false}
          create_title="Donate With Just One Click."
          edit_title=""
        />
      </section>

      {/* Body */}
      <div className="mt-4 flex flex-col gap-4">
        <div className="input-group">
          <input
            type="text"
            {...register("address", {
              required: true,
            })}
            className="input"
            // value={global_project?.address}
            readOnly
          />

          <label className="placeholder border">Donating To.</label>
        </div>

        <div className="input-group">
          <input
            type="number"
            className="input"
            value={value}
            onChange={(event) => setValue(parseInt(event.target.value))}
          />

          <label className="placeholder border">
            Enter Donation Amount In RM.
          </label>

          {errors["donation_amount"] && (
            <Error error_message="Provided The Amount You Intent To Donate Please." />
          )}
        </div>

        {error && <Error error_message={error_message} />}

        {back_end_error && <Error error_message={error_message} />}

        <div className="flex justify-end absolute -bottom-[1rem] right-[1rem]">
          <button
            className="primary_button"
            onClick={async () => {
              // if (!isConnected) {
              //   Notification.errorNotification(
              //     "Please Connect To A MetaMask First."
              //   );
              //   return;
              // }

              // sendTransaction?.();

              // if (value >= 1000) {
              //   Notification.errorNotification(
              //     "Donation Amount Cannot Greater Than 1000 at a go."
              //   );
              //   return;
              // }

              updateProjectDetails();

              setValue(0);
              setGlobalProject(null);
              Notification.successNotification(
                "Transaction Was Successful.Thank you For Your Donation."
              );
              setErrorMessage("");
              setShowDonateModal(false);
            }}
          >
            Donate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Donate;
