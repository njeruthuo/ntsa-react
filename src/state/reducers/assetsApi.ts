import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { setHistory } from "./assetSlice";

export const assetsApi = createApi({
  reducerPath: "assetsApi",
  baseQuery: baseQuery,
  tagTypes: ["History"],
  endpoints: (builder) => ({
    getUserAssets: builder.query<Asset[], { user_id: string }>({
      query: ({ user_id }) =>
        `/settings/assetmanagement/getassets?userid=${user_id}`,
    }),

    filterData: builder.query({
      query: ({ asset_id }) =>
        `/settings/assetmanagement/getspeedlimiterdetails?assetid=${asset_id}`,
    }),

    getHistoryData: builder.query<HistoryApiResponse, HistoryPayload>({
      query: (body) => ({
        url: `/AnalyticsService/gethistory`,
        method: "POST",
        body,
      }),
      providesTags: ["History"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setHistory(data.data));
        } catch (error) {
          console.error("History fetch failed", error);
        }
      },
    }),
  }),
});

export const {
  useFilterDataQuery,
  useGetUserAssetsQuery,
  useGetHistoryDataQuery,
} = assetsApi;

export interface AssetStatusDetails {
  status_id: number;
  name: string;
  description: string | null;
}

export interface DeviceType {
  device_type_id: number;
  device_type: string;
}

export interface Asset {
  asset_category: string | null;
  asset_id: number;
  asset_model: string | null;
  violations: string;
  asset_name: string;
  asset_status: string;
  asset_status_details: AssetStatusDetails;
  asset_type: string | null;
  asset_type_details: string | null; // Replace 'string' if you have the specific type
  asset_usage_details: string | null;
  backup_device_id: string | null;
  backup_last_polled: string | null;
  client_category: string | null;
  current_location: string;
  description: string;
  descriptors: string[];
  device_id: string;
  device_type: DeviceType;
  driver: string | null;
  last_driver: string;
  last_polled: string; // Or Date if you plan to parse it
  make: string;
  model: string;
  ownership: string;
  panic: boolean;
  photo: string;
  realOdometer: number;
  usage: string | null;
  year_of_manufacture: number | null;
}

export interface HistoryItem {
  device_timezone: number;
  unit_id: string;
  fixtime: string; // Format: "m/dd/yyyy h:mm:ss AM/PM"
  alerts: unknown[]; // Provided as an empty array []
  location: string;
  speed: number;
  course: number;
  longitude: number;
  latitude: number;
  reg_no: string;
  driver: string;
  violations: string;
  mileage: number;
}

export interface HistoryApiResponse {
  response: "success" | "error";
  data: HistoryItem[];
}

export interface HistoryPayload {
  unit_id: string;
  start_date: string;
  end_date: string;
}
