import * as React from "react";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import api from "./services/api";
import { fetch } from "./services/http";

function UserList() {
  const [columns] = useState([
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
    let isMounted = true;
    fetch(api.apiURL + api.user)
      .then(res => isMounted && setData(res.data.data))
      .catch(err => console.log(err));
    return () => isMounted = false;
  }, []);

  return (
    <div className="mt-3">
      <MaterialTable
        title="User List"
        columns={columns}
        data={data}
      />
    </div>
  )
}

export default withRouter(UserList)