import { DateCell, Icon } from "@/components";
import { db } from "@/firebase";
import { Notification } from "@/utils";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { FiTrash } from "react-icons/fi";
import useUser from "./useUser";

const useDonation = () => {
  /**
   * Hook States
   */
  const [donations, setDonations] = useState<DocumentData[]>();
  const { user } = useUser();

  const donation_table_columns = useMemo(
    () => [
      {
        Header: "All YOUR Donations",
        columns: [
          {
            Header: "Project Title",
            accessor: "project_title",
          },
          {
            Header: "Project Status",
            accessor: "status",
          },
          {
            Header: "Donation Date",
            accessor: "timestamp",
            Cell: DateCell,
          },
          {
            Header: "Donation Amount (RM)",
            accessor: "amount",
          },
          {
            Header: "Actions",
            accessor: "actions",
          },
        ],
      },
    ],
    []
  );

  /**
   * Hook Functions
   */
  useEffect(
    // clean
    () =>
      onSnapshot(
        query(collection(db, "donations"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setDonations(snapshot.docs);
        }
      ),
    [db]
  );

  const deleteDonationHistory = async (history_id: string) => {
    try {
      const doc_ref = doc(db, "donations", history_id);
      await deleteDoc(doc_ref).then(() => {
        Notification.successNotification("Donation Deleted Successfully.");
      });
    } catch (error) {
      console.log("Error when deleting", error);
    }
  };

  const currentUserDonations = (): DocumentData[] | undefined => {
    if (user) {
      return donations?.filter(
        (donation) => donation.data().donor === user?.uid
      );
    } else return [] as DocumentData[];
  };

  const currentOrgDonations = (): DocumentData[] | undefined => {
    if (user) {
      return donations?.filter(
        (donation) => donation.data().org_email === user?.email
      );
    } else return [] as DocumentData[];
  };

  const getCurrentUserDonationDataForDonationTable = () => {
    // console.log("currentUserDonations", currentUserDonations()?);

    let current_user_donation_data = [] as any;

    currentUserDonations()?.map((current_user_donation) => {
      current_user_donation_data = [
        ...current_user_donation_data,
        {
          project_title: current_user_donation.data().project_title,
          status: current_user_donation.data().project_status,
          amount: current_user_donation.data().donation_amount_in_MY,
          timestamp: current_user_donation.data().timestamp,
          project_id: current_user_donation.data().project_id,

          actions: [
            <div
              className="flex gap-x-3 items-center"
              key={current_user_donation.data().project_id}
            >
              <Icon
                icon={<FiTrash className="text-red-500" />}
                purpose={() => deleteDonationHistory(current_user_donation.id)}
                iconWrapperStyles=""
              />
            </div>,
          ],
        },
      ];
    });

    return current_user_donation_data;
  };

  /**
   * Memorizing Specific Values To Prevent Rerenders And Increase Faster Load Time (One Can Also Choose To Ignore This)
   */
  const memoedValue = useMemo(
    () => ({
      donations,
      currentUserDonations,
      donation_table_columns,
      getCurrentUserDonationDataForDonationTable,
      currentOrgDonations,
    }),
    [donations]
  );

  return memoedValue;
};

export default useDonation;
