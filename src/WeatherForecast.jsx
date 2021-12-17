import * as React from "react";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import api from "./services/api";
import { get } from "./services/http";

function WeatherForecast() {
  const [columns] = useState([
    { title: "Date", field: "date" },
    { title: "Minimum Temperature", field: "temperatureC" },
    { title: "Maximum Temperature", field: "temperatureF" },
    { title: "Summary", field: "summary" },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    get(api.apiURL + api.weather)
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="container mt-3">
      < MaterialTable
        title="Weather Forecast"
        columns={columns}
        data={data}
        options={{ search: false, paging: false }
        }
      />
    </div >
  )
}

export default withRouter(WeatherForecast)