import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { HistoryItem } from "@/state/reducers/assetsApi";

export const exportHistoryToExcel = (history: HistoryItem[]) => {
  if (!history || history.length === 0) return;

  // Convert to clean flat structure
  const formattedData = history.map((item) => ({
    Datetime: item.fixtime,
    Latitude: item.latitude,
    Longitude: item.longitude,
    Speed: item.speed,
    Location: item.location,
    Driver: item.driver,
    Mileage: item.mileage,
    Course: item.course,
    UnitID: item.unit_id,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "History");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, `history_export_${new Date().toISOString()}.xlsx`);
};
