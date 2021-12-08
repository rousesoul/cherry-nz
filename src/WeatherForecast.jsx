import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import AuthService from "./services/auth.service";
import NavBar from './NavBar';

export default function WeatherForecast(props) {
  const currentUser = AuthService.getCurrentUser()

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
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <NavBar />
      {currentUser ?
        <div className="container mt-3">
          <MaterialTable
            title="Weather Forecast"
            columns={columns}
            data={data}
            options={{ search: false, paging: false }}
          />
        </div>
        :
        <div class="text-center mt-5">
          <h5>Sorry! You are not our user, or your token has expired.</h5>
          <a href="/home" className="text-danger"><h3>Please Login or Signin first!</h3></a>
        </div>
      }
    </>
  )
}