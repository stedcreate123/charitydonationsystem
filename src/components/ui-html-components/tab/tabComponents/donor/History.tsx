import { Table, Title } from "@/components";
import useDonation from "@/hooks/useDonation";

const History = () => {
  /**
   * component States
   */
  const { getCurrentUserDonationDataForDonationTable, donation_table_columns } =
    useDonation();

  return (
    <section>
      {/* Title */}
      <Title title="My Donations" title_styles="text-2xl mb-2 text-blue-500" />

      {/* Table */}
      <section className="w-full px-2 overflow-x-auto">
        <Table
          columns={donation_table_columns}
          data={getCurrentUserDonationDataForDonationTable()}
          showFilters
          tableHeight="h-[26.5rem] lg:h-[29rem]"
        />
      </section>
    </section>
  );
};

export default History;
