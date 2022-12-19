import { Button, DateCell } from "@/components";
import { db } from "@/firebase";
import { Notification } from "@/utils";
import generateDonationReport from "@/utils/generateDonotionReport";
import generateYearPDF from "@/utils/generateYearReport";
import generatePDF from "@/utils/reportGenerator";
import { format } from "date-fns";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import useDonation from "./useDonation";
import useProject from "./useProject";
import useUser from "./useUser";

const useReport = () => {
  /**
   * Hook States
   */
  const { user } = useUser();
  const id = new Date().getTime() / 1000;
  const [reports, setReports] = useState<DocumentData[]>();
  const { currentOrgDonations } = useDonation();

  const report_table_columns = useMemo(
    () => [
      {
        Header: "Created Reports",
        columns: [
          {
            Header: "Date",
            accessor: "date",
            Cell: DateCell,
          },
          {
            Header: "Year",
            accessor: "year",
          },
          {
            Header: "Month",
            accessor: "month",
          },
          {
            Header: "Usage",
            accessor: "usage",
          },
          {
            Header: "Amount",
            accessor: "amount",
          },
        ],
      },
    ],
    []
  );

  useEffect(
    // clean
    () =>
      onSnapshot(query(collection(db, "orgreports")), (snapshot) => {
        setReports(snapshot.docs);
      }),
    [db]
  );

  const createReport = async ({
    date,
    usage,
    amount,
  }: {
    date: Date;
    usage: string;
    amount: number;
  }) => {
    await setDoc(doc(db, "orgreports", id.toString()), {
      org_email: user?.email,
      id: id.toString(),
      date: date,
      type: "usage",
      usage: usage,
      amount: amount,
      year: date.getFullYear(),
      month: date.toLocaleString("default", { month: "long" }),
    });
  };

  // .then(() => {
  //      generateMontyReport({
  //        date: date,
  //        usage: usage,
  //        amount: amount,
  //      });
  //    });

  const generateMontyReport = (month: string, year: number) => {
    const monthly_reports = reports?.filter(
      (report) =>
        report.data().org_email === user?.email &&
        report.data().month === month &&
        report.data().year === year
    );

    let data: any = [];
    if (monthly_reports?.length! > 0) {
      monthly_reports?.map((report: DocumentData) => {
        data = [
          ...data,
          {
            date: new Timestamp(
              report.data().date?.seconds,
              report.data().date?.nanoseconds
            ).toDate(),
            usage: report.data().usage,
            amount: report.data().amount,
          },
        ];
      });

      generatePDF(
        `Report On Usage Of Funds  On The Month Of ` + month + ` ` + year,
        ["Date", "Usage", "Amount"],
        data
      );

      Notification.successNotification(
        "Reported Generated Successfully.Check Your Downloads."
      );
    } else {
      Notification.errorNotification("Data Not Found");
      return;
    }
  };

  const generateYearlyReport = (year: number) => {
    const yearly_reports = reports?.filter(
      (report) =>
        report.data().org_email === user?.email && report.data().year === year
    );

    if (yearly_reports?.length! > 0) {
      const total_collected = yearly_reports?.reduce(
        (prev_value, report) => prev_value + parseInt(report.data().amount),
        0
      );

      let data: any = [];
      yearly_reports?.map((report: DocumentData) => {
        data = [
          ...data,
          {
            date: new Timestamp(
              report.data().date?.seconds,
              report.data().date?.nanoseconds
            ).toDate(),
            usage: report.data().usage,
            amount: report.data().amount,
            month: report.data().month,
          },
        ];
      });

      generateYearPDF(
        `Report On Usage Of Funds  On The Year  ` + year,
        "Total Donated: " + total_collected,
        ["Date", "Month", "Usage", "Amount"],
        data
      );

      Notification.successNotification(
        "Reported Generated Successfully.Check Your Downloads."
      );
    } else {
      Notification.errorNotification("No Data Found");
      return;
    }
  };

  const generateDonationReports = () => {
    if (currentOrgDonations()?.length! > 0) {
      let data: any = [];
      currentOrgDonations()?.map((donation: DocumentData) => {
        data = [
          ...data,
          {
            date: new Timestamp(
              donation.data().timestamp?.seconds,
              donation.data().timestamp?.nanoseconds
            ).toDate(),
            donor_email: donation.data().donor_email,
            region: donation.data().region,
            amount: donation.data().donation_amount_in_MY,
          },
        ];
      });

      const total_collected = currentOrgDonations()?.reduce(
        (prev_value, donation) =>
          prev_value + parseInt(donation.data().donation_amount_in_MY),
        0
      );

      generateDonationReport(
        `Report Of Your Organization Donations`,
        "Total Donated: " + total_collected,
        data
      );
    } else {
      Notification.errorNotification(
        "Your Organization Has Not Received Any Donations Yet."
      );

      Notification.successNotification(
        "Reported Generated Successfully.Check Your Downloads."
      );
      return;
    }
  };

  const currentOrgReports = (): DocumentData[] | undefined => {
    if (user) {
      return reports?.filter(
        (report) => report.data().org_email === user?.email
      );
    } else return [] as DocumentData[];
  };

  const getReportData = () => {
    let current_org_reports_data = [] as any;

    currentOrgReports()?.map((report) => {
      current_org_reports_data = [
        ...current_org_reports_data,
        {
          date: report.data().date,
          month: report.data().month,
          usage: report.data().usage,
          amount: report.data().amount,
          year: report.data().year,
        },
      ];
    });

    return current_org_reports_data;
  };

  return {
    createReport,
    report_table_columns,
    getReportData,
    generateMontyReport,
    generateYearlyReport,
    generateDonationReports,
  };
};

export default useReport;
