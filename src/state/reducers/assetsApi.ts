import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const assetsApi = createApi({
  reducerPath: "assetsApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserAssets: builder.query<Asset[], { user_id: string }>({
      query: ({ user_id }) =>
        `/settings/assetmanagement/getassets?userid=${user_id}`,
    }),
  }),
});

export const { useGetUserAssetsQuery } = assetsApi;

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
