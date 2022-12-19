import jsPDF from "jspdf";
import { format } from "date-fns";
import "jspdf-autotable";
import { LogoImage } from "@/assets";
// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a tickets argument
const generateYearPDF = (title, title2, table_columns, report_data) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = table_columns;
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  report_data.forEach((data) => {
    const report_data = [
      format(new Date(data.date), "dd"),
      data.month,
      data.usage,
      data.amount,
    ];
    // push each tickcet's info into a row
    tableRows.push(report_data);
  });

  // return;

  // startY is basically margin-top
  doc.addImage(LogoImage, "png", 14, 0, 35, 35);
  doc.autoTable(tableColumn, tableRows, { startY: 50 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(title, 14, 35);
  doc.text(title2, 14, 45);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generateYearPDF;
