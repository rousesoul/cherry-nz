import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import AuthService from "./services/auth.service";

export default function OderList() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const [columns] = useState([
    { title: 'User Id', field: 'userId', type: 'numeric' },
    { title: 'User Name', field: 'userName' },
    { title: 'Type', field: 'type', type: 'numeric' },
    { title: 'Discount Rate', field: 'discountRate', type: 'numeric' },
    { title: 'Password', field: 'password' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Is Active', field: 'isActive', type: 'numeric' },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Mobile Number', field: 'mobileNumber' },
    { title: 'Email', field: 'email' },
    { title: 'Company Name', field: 'companyName' },
    { title: 'T Order', field: 'tOrder' },
  ]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    axios.get('http://206.189.39.185:5031/api/Order', { signal: abortCont.signal, timeout: 5000 })
      .then(res => {
        setIsLoading(false);
        setData(res.data.data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          setIsLoading(false);
          console.log(err.message);
        }
      })

    return () => abortCont.abort();
  }, [])

  return (
    <>
      {currentUser ?
        <div className="home">
          {error && <div>{error}</div>}
          <MaterialTable
            title="Order List"
            isLoading={isLoading}
            columns={columns}
            data={data}
            options={{ actionsColumnIndex: -1, addRowPosition: 'first' }}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);

                    resolve();
                  }, 1000)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);

                    resolve();
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);

                    resolve()
                  }, 1000)
                }),
            }} />
        </div>
        :
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </>
  );
}