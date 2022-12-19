import React, { useState } from "react";
import { Button, ModalHeader, Select } from "@/components";
import { show_org_reports_state } from "@/atoms/ModalAtoms";
import { useSetRecoilState } from "recoil";
import { useReport } from "@/hooks";
import { Notification } from "@/utils";

type Option = {
  name: string;
  value: string;
};

const OrgReports = () => {
  /**
   * Component States
   */
  const setShowOrgReportsModal = useSetRecoilState(show_org_reports_state);
  const [selected_report_type, setSelectedReportType] = useState("");
  const [selected_month, setSelectedMonth] = useState("");
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState<string>("");

  const type_options: any = ["monthly", "annual"];
  const { generateMontyReport, generateYearlyReport } = useReport();

  const months_options: any = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generate = () => {
    if (selected_report_type === "") {
      Notification.errorNotification("Please Select The Report Type");

      return;
    }

    if (selected_report_type === "monthly" && selected_month === "") {
      Notification.errorNotification("Please Select The Month");

      return;
    }

    if (year === "" || year === "0") {
      Notification.errorNotification("Please Enter A Valid Year");

      return;
    }

    if (selected_report_type === "monthly") {
      generateMontyReport(selected_month, parseInt(year));
    } else {
      generateYearlyReport(parseInt(year));
    }

    setSelectedMonth("");
    setSelectedReportType("");
    setYear("");
    setShowOrgReportsModal(false);
  };

  return (
    <section className="px-4">
      {/* Header */}
      <section>
        <ModalHeader
          close={() => {
            setShowOrgReportsModal(false);
          }}
          is_editing={false}
          create_title="Create A Report With Easy Clicks"
          edit_title=""
        />
      </section>

      <div className="mt-3 flex flex-col gap-5">
        {/* Type */}
        <Select
          title="Select Type"
          options={type_options}
          selectWrapperStyles="w-[12rem] rounded-xl ring-c_gray p-[0.3rem]"
          selectPanelStyles="ring-c_gray/40 shadow "
          selected={selected_report_type}
          setSelected={(option: any) => setSelectedReportType(option)}
          multiple={false}
          selectLabel=""
          selectLabelStyles=""
        />

        {selected_report_type === "monthly" ? (
          <Select
            title="Select Month"
            options={months_options}
            selectWrapperStyles="w-[12rem] rounded-xl ring-c_gray p-[0.3rem]"
            selectPanelStyles="ring-c_gray/40 shadow "
            selected={selected_month}
            setSelected={(option: any) => setSelectedMonth(option)}
            multiple={false}
            selectLabel=""
            selectLabelStyles=""
          />
        ) : (
          ""
        )}

        <div className="input-group">
          <input
            type="text"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="input"
          />

          <label className="placeholder border">Enter The Year</label>
        </div>
      </div>

      <Button
        title="Create Reports"
        type="button"
        purpose={generate}
        button_styles="primary_button mt-4 w-fit"
      />
    </section>
  );
};

export default OrgReports;
