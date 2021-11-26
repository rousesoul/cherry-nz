import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

export default function WeatherForecast() {

  const [columns] = useState([
    { title: 'Date', field: 'date' },
    { title: 'Minimum Temperature', field: 'temperatureC' },
    { title: 'Maximum Temperature', field: 'temperatureF' },
    { title: 'Summary', field: 'summary' },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://206.189.39.185:5031/WeatherForecast')
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <MaterialTable
      title="Weather Forecast"
      columns={columns}
      data={data}
      options={{search:false, paging:false}}
    />
  )
}