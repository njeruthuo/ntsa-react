import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="dashboard-page mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

      <div className="dashboard-content">
        {/* Search Section */}
        <section className="search-section">
          <h3 className="font-bold my-2">Search Vehicle</h3>
          <div className="flex w-full space-x-4 mb-4">
            <input
              className="flex-3 px-4"
              type="text"
              placeholder="Enter Registration Number"
            />
            <Button className="ml-auto">Search</Button>
          </div>

          <div className="data-buttons">
            <button>1HR DATA</button>
            <button>6HR DATA</button>
            <button>24HR DATA</button>
            <button>72HR DATA</button>
            <button>ALL DATA EXCEL</button>
          </div>
        </section>

        {/* Vehicle Info Section */}
        <section className="vehicle-info">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Owner Name</strong>
                </td>
                <td>AKSHAR LOGISTICS LIMITED</td>
                <td>
                  <strong>Owner ID</strong>
                </td>
                <td>AKSHAR LOGISTICS LIMITED</td>
                <td>
                  <strong>Owner Phone</strong>
                </td>
                <td>0720769560</td>
              </tr>

              <tr>
                <td>
                  <strong>Registration Number</strong>
                </td>
                <td>KCC 722D</td>
                <td>
                  <strong>Chassis Number</strong>
                </td>
                <td>WDB9440322K944629</td>
                <td>
                  <strong>Make & Type</strong>
                </td>
                <td>-</td>
              </tr>

              <tr>
                <td>
                  <strong>Limiter Type</strong>
                </td>
                <td>BT SPL</td>
                <td>
                  <strong>Limiter Serial</strong>
                </td>
                <td>NR09G36292</td>
                <td>
                  <strong>Fitting Agent Name</strong>
                </td>
                <td>Rivercross Tracking Ltd</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Vehicle Data Table */}
        <section className="vehicle-data">
          <table>
            <thead>
              <tr>
                <th>Datetime</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Speed</th>
                <th>Violations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jan 6, 2026, 1:25:37 PM</td>
                <td>-1.95486</td>
                <td>37.3087</td>
                <td>29</td>
                <td>--</td>
              </tr>
              <tr>
                <td>Jan 6, 2026, 1:23:22 PM</td>
                <td>-1.96121</td>
                <td>37.3143</td>
                <td>31</td>
                <td>--</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
