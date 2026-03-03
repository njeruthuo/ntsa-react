import {
  useGetUserAssetsQuery,
  type Asset,
  useFilterDataQuery,
  useGetHistoryDataQuery,
} from "@/state/reducers/assetsApi";
import type { RootState } from "@/state/store";
import { parseFixTime } from "@/utils/dateParser";
import { exportHistoryToExcel } from "@/utils/excel";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard2 = () => {
  const [vehicle, setVehicle] = useState<string>("");
  const [filter, setFilter] = useState(false);
  const [foundAsset, setFoundAsset] = useState<Asset | undefined>();
  const [duration, setDuration] = useState(1);

  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const user_id = useSelector((state: RootState) => state.auth.user_id);

  const { data: UserAssets, isLoading: loadingSpinner } = useGetUserAssetsQuery(
    { user_id },
  );

  const { data: FilteredLimiterData } = useFilterDataQuery(
    { asset_id: foundAsset?.asset_id },
    { skip: !filter },
  );

  const { startTime, endTime } = useMemo(() => {
    return getHistoryRange(duration);
  }, [duration]);

  const { data: HistoryData } = useGetHistoryDataQuery(
    {
      unit_id: FilteredLimiterData?.unit_id,
      start_date: startTime,
      end_date: endTime,
    },
    { skip: !FilteredLimiterData },
  );

  const filteredAssetList = useMemo(() => {
    if (vehicle && vehicle?.length > 0) {
      return UserAssets?.filter((asset) =>
        asset.asset_name.toLowerCase().includes(vehicle.toLowerCase()),
      );
    }
    return [];
  }, [vehicle, UserAssets]);

  const filterData = async (e: React.FormEvent) => {
    e.preventDefault();
    setFilter(true);
  };

  const downloadxlsx = () => {
    exportHistoryToExcel(HistoryData?.data || []);
  };

  function handleSelectAsset(asset: Asset) {
    setFoundAsset(asset);
    setVehicle(asset.asset_name);
  }

  const homeReturn = () => {
    setFoundAsset(undefined);
  };

  const sortAccounts = () => {
    const sorted = [...(HistoryData?.data || [])]?.sort((a, b) => {
      return (
        new Date(b.fixtime || "").getTime() -
        new Date(a.fixtime || "").getTime()
      );
    });
    return sorted;
  };

  const paginatedData = sortAccounts()?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const durations = [
    { label: "1H", value: 1 },
    { label: "6H", value: 6 },
    { label: "24H", value: 24 },
    { label: "72H", value: 72 },
  ];

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div>
          <form className="d-flex search" onSubmit={filterData}>
            <div className="form-group">
              <label className="label">
                <h6>
                  <b>Search Vehicle</b>
                </h6>
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Search by vehicle Reg (Try with space eg SP TEST) / Serial Number"
              />
            </div>
            <button type="submit" className="btn btn-primary m-4">
              Search
            </button>
          </form>

          {!foundAsset &&
            filteredAssetList &&
            filteredAssetList?.length > 0 && (
              <div className="shadow-cyan-50 shadow mt-0 border h-[10vh] w-full overflow-auto">
                {filteredAssetList.map((asset) => (
                  <p
                    onClick={() => handleSelectAsset(asset)}
                    className="text-sm pt-1 px-4 border border-black m-1 hover:cursor-pointer hover:bg-white"
                  >
                    {asset.asset_name}
                  </p>
                ))}
              </div>
            )}
        </div>

        {loadingSpinner && (
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading data...</span>
          </div>
        )}

        <div>
          <button
            onClick={homeReturn}
            className="btn btn-danger btn-sm"
            style={{ float: "right" }}
          >
            Back
          </button>
        </div>

        <div className="container">
          {durations.map((d) => (
            <button
              key={d.value}
              style={{ margin: 5 }}
              onClick={() => setDuration(d.value)}
              className={`btn btn-sm ${duration === d.value ? "btn-success" : "btn-primary"}`}
            >
              {d.label}
            </button>
          ))}

          <button
            className="btn btn-sm btn-primary"
            style={{ margin: 5 }}
            onClick={downloadxlsx}
          >
            ALL DATA EXCEL
          </button>
        </div>

        {foundAsset && (
          <>
            <table className="table table-sm table-striped table-hover table-bordered">
              <tbody>
                <tr>
                  <th>Owner Name</th>
                  <td>{FilteredLimiterData?.actual_owner}</td>
                  <th>Owner ID</th>
                  <td>{FilteredLimiterData?.unit_id}</td>
                  <th>Owner Phone</th>
                  <td>{FilteredLimiterData?.actual_owner_phone_no}</td>
                </tr>
                <tr>
                  <th>Registration Number</th>
                  <td>{foundAsset?.asset_name}</td>
                  <th>Chasis Number</th>
                  <td>{FilteredLimiterData?.chasis_no}</td>
                  <th>Make & Type</th>
                  <td>{foundAsset?.make}</td>
                </tr>
              </tbody>
            </table>

            <div className="table-responsive">
              <table className="table table-sm table-striped table-hover table-bordered">
                <thead>
                  <tr className="bg-info">
                    <th>Datetime</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Location</th>
                    <th>Speed</th>
                    <th>Violations</th>
                  </tr>
                </thead>
                <tbody>
                  {foundAsset &&
                    paginatedData?.map((product, index) => (
                      <tr key={index}>
                        <td>
                          {product?.fixtime &&
                            parseFixTime(product?.fixtime).toISOString()}
                        </td>
                        <td>{product?.latitude}</td>
                        <td>{product?.longitude}</td>
                        <td>{product?.location}</td>
                        <td>{product?.speed}</td>
                        <td>{product?.violations || ""}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-sm btn-secondary m-1"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>
                <button
                  className="btn btn-sm btn-secondary m-1"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Dashboard2;

const getHistoryRange = (hours: number) => {
  const now = new Date();
  const endTime = now.toISOString();

  // Calculate start time by subtracting milliseconds
  const startTime = new Date(
    now.getTime() - hours * 60 * 60 * 1000,
  ).toISOString();

  return { startTime, endTime };
};
