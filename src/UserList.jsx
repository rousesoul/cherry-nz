import * as React from "react";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import api from "./services/api";
import { get } from "./services/http";

function UserList() {
  const [columns] = useState([
    { title: "User Id", field: "userId", type: "numeric" },
    { title: "User Name", field: "userName" },
    { title: "Type", field: "type", type: "numeric" },
    { title: "Discount Rate", field: "discountRate", type: "numeric" },
    { title: "Password", field: "password" },
    { title: "Created At", field: "createdAt" },
    { title: "Is Active", field: "isActive", type: "numeric" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Mobile Number", field: "mobileNumber" },
    { title: "Email", field: "email" },
    { title: "Company Name", field: "companyName" },
    { title: "T Order", field: "tOrder" },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    get(api.apiURL + api.user)
      .then(res => {
        setData(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="mt-3">
      <MaterialTable
        title="User List"
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
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
  )
}

export default withRouter(UserList)