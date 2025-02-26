// components/DataReview.tsx

import { useEffect, useState } from "react";
import DataGrid from "./DataGrid";


export default function DataReviewTable() {
  // Loading State: Indicates if the data is being fetched
  const [loading, setLoading] = useState(true);
  // Error State: Stores any errors that occur during data fetching.
  const [, setError] = useState<unknown>(null);
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setRowData(json.records);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <DataGrid data={rowData} loading={loading}/>
    </div>
  );
}
