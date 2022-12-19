import React, { useMemo, useState } from "react";
import { Button, Error, Select, Table } from "@/components";
import { Calendar } from "react-date-range";
import { SubmitHandler, useForm } from "react-hook-form";
import { Notification } from "@/utils";
import { useReport } from "@/hooks";
import { useSetRecoilState } from "recoil";
import { show_org_reports_state } from "@/atoms/ModalAtoms";

type ReportInfo = {
  usage: string;
  amount: number;
};

const OrganizationReports = () => {
  /**
   * Component States
   */
  const [date, setDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportInfo>();
  const { createReport, report_table_columns, getReportData } = useReport();
  const setShowOrgReportsModal = useSetRecoilState(show_org_reports_state);
  const { generateDonationReports } = useReport();

  /**
   * Component Functions
   */
  const handleDateSelect = (date: Date) => {
    setDate(date);
  };

  const onSubmit: SubmitHandler<ReportInfo> = async ({ amount, usage }) => {
    await createReport({
      date: date,
      usage: usage,
      amount: amount,
    }).then(() => {
      reset({
        amount: 0,
        usage: "",
      });

      setDate(new Date());
    });
  };

  return (
    <section className="px-4 flex gap-4">
      <div>
        {/* Title */}
        <h2 className="text-lg font-semibold">Create A Usage Record</h2>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Date */}

          <div className="mt-4">
            <h2>Record Date</h2>
            <Calendar
              date={date}
              onChange={handleDateSelect}
              maxDate={new Date()}
            />
          </div>

          <div className=" flex flex-col gap-5">
            <div className="input-group">
              <input
                type="text"
                {...register("usage", {
                  required: true,
                })}
                className="input"
              />

              <label className="placeholder border">Usage</label>

              {errors["usage"] && (
                <Error error_message="Explain how the money was spend" />
              )}
            </div>

            <div className="input-group">
              <input
                type="number"
                {...register("amount", {
                  required: true,
                })}
                className="input"
              />

              <label className="placeholder border">Amount Used</label>

              {errors["amount"] && (
                <Error error_message="  Enter how much was used of the total Organization Amount" />
              )}
            </div>
          </div>

          <Button
            title="Create"
            type="submit"
            button_styles="primary_button mt-4"
          />
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-5">
          <Button
            title="Create Reports"
            type="button"
            purpose={() => setShowOrgReportsModal(true)}
            button_styles="primary_button mt-4 w-fit"
          />
          <Button
            title="Create Donation Reports"
            type="button"
            purpose={() => generateDonationReports()}
            button_styles="primary_button mt-4 w-fit"
          />
        </div>
        <Table
          columns={report_table_columns}
          data={getReportData()}
          showFilters
          tableHeight="h-[26.5rem] lg:h-[29rem]"
        />
      </div>
    </section>
  );
};

export default OrganizationReports;
