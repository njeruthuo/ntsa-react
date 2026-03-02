import React, { useState } from "react";

interface LimiterInfo {
  actual_owner?: string;
  actual_owner_id?: string;
  actual_owner_phone_no?: string;
  reg_no?: string;
  chasis_no?: string;
  make?: string;
  limiter_type?: string;
  limiter_serial?: string;
  agent_name?: string;
  agent_idno?: string;
  phone_number?: string;
  email_address?: string;
  station_location?: string;
  limiter_fitting_date?: string;
  business_regno?: string;
  certificate_no?: string;
}

interface LocationRecord {
  location_time?: string;
  lat?: number;
  lon?: number;
  speed?: number;
  msg_type?: string;
}

interface Asset {
  limiter_info?: LimiterInfo;
}

const Dashboard2 = () => {
  const [vehicle, setVehicle] = useState<string>("");
  const [foundAsset] = useState<Asset | null>(null);
  const [records] = useState<LocationRecord[]>([]);
  const [loadingSpinner] = useState<boolean>(false);

  const [onehour, setOnehour] = useState(true);
  const [sixhour, setSixhour] = useState(false);
  const [twntfourhour, setTwntfourhour] = useState(false);
  const [svntwohour, setSvntwohour] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const filterData = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API here
  };

  const calc = (range: string) => {
    setOnehour(range === "one hour");
    setSixhour(range === "six hours");
    setTwntfourhour(range === "24 hours");
    setSvntwohour(range === "72 hours");

    // Fetch filtered data
  };

  const downloadxlsx = () => {
    // Implement download logic
  };

  const homeReturn = () => {
    // Navigate back
  };

  const sortAccounts = (key: string) => {
    console.log(key);

    const sorted = [...records].sort((a, b) => {
      return (
        new Date(b.location_time || "").getTime() -
        new Date(a.location_time || "").getTime()
      );
    });
    return sorted;
  };

  const paginatedData = sortAccounts("-location_time").slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
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
          <button
            className={`btn btn-sm ${onehour ? "btn-success" : "btn-primary"}`}
            style={{ margin: 5 }}
            onClick={() => calc("one hour")}
          >
            1HR DATA
          </button>

          <button
            className={`btn btn-sm ${sixhour ? "btn-success" : "btn-primary"}`}
            style={{ margin: 5 }}
            onClick={() => calc("six hours")}
          >
            6HR DATA
          </button>

          <button
            className={`btn btn-sm ${twntfourhour ? "btn-success" : "btn-primary"}`}
            style={{ margin: 5 }}
            onClick={() => calc("24 hours")}
          >
            24HR DATA
          </button>

          <button
            className={`btn btn-sm ${svntwohour ? "btn-success" : "btn-primary"}`}
            style={{ margin: 5 }}
            onClick={() => calc("72 hours")}
          >
            72HR DATA
          </button>

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
                  <td>{foundAsset.limiter_info?.actual_owner}</td>
                  <th>Owner ID</th>
                  <td>{foundAsset.limiter_info?.actual_owner_id}</td>
                  <th>Owner Phone</th>
                  <td>{foundAsset.limiter_info?.actual_owner_phone_no}</td>
                </tr>
                <tr>
                  <th>Registration Number</th>
                  <td>{foundAsset.limiter_info?.reg_no}</td>
                  <th>Chasis Number</th>
                  <td>{foundAsset.limiter_info?.chasis_no}</td>
                  <th>Make & Type</th>
                  <td>{foundAsset.limiter_info?.make}</td>
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
                    <th>Speed</th>
                    <th>Violations</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((product, index) => (
                    <tr key={index}>
                      <td>
                        {product.location_time &&
                          new Date(
                            product.location_time + "Z",
                          ).toLocaleString()}
                      </td>
                      <td>{product.lat}</td>
                      <td>{product.lon}</td>
                      <td>{product.speed}</td>
                      <td>{product.msg_type}</td>
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
