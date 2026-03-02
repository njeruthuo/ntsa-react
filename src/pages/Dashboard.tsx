const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* Header */}
      

      <div className="dashboard-content">
        {/* Search Section */}
        <section className="search-section">
          <h3>Search Vehicle</h3>
          <div className="search-bar">
            <input type="text" placeholder="Enter Registration Number" />
            <button>Search</button>
            <button className="back-btn">Back</button>
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
