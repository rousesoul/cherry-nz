import * as React from "react";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import api from "./services/api";
import { get } from "./services/http";

function OderList() {
  const [columns] = useState([
    { title: "User Id", field: "userId", type: "numeric" },
    { title: "Product Id", field: "productId", type: "numeric" },
    { title: "QTY Rate", field: "qty", type: "numeric" },
    { title: "Batch Id", field: "batchId" },
    { title: "Price Id", field: "price", type: "numeric" },
    { title: "Unit Price Rate", field: "unitPrice", type: "numeric" },
    { title: "Po Number", field: "poNumber" },
    { title: "Recipient", field: "recipient" },
    { title: "Recipient Country", field: "recipientCountry" },
    { title: "Recipient Provience", field: "recipientProvience" },
    { title: "recipient City", field: "recipientCity" },
    { title: "Recipient Addr", field: "recipientAddr" },
    { title: "Recipient Number", field: "recipientNumber" },
    { title: "Sender City", field: "senderCity" },
    { title: "Sender Addr", field: "senderAddr" },
    { title: "Sender Country", field: "senderCountry" },
    { title: "Sender Number", field: "senderNumber" },
    { title: "Sender Name", field: "senderName" },
    { title: "Status", field: "status", type: "numeric" },
    { title: "Track No", field: "trackNo" },
    { title: "Billing Company", field: "billingCompany" },
    { title: "Customer Reference No", field: "customerReferenceNo" },
    { title: "Sender Company Name", field: "senderCompanyName" },
    { title: "Payment Method", field: "paymentMethod" },
  ]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    get(api.apiURL + api.order, { signal: abortCont.signal, timeout: 60000 })
      .then(res => {
        setIsLoading(false);
        setData(res.data.data);
        setError(null);
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("fetch aborted")
        } else {
          setIsLoading(false);
          console.log(err.message);
        }
      })

    return () => abortCont.abort();
  }, [])

  return (
    <div className="mt-3">
      {error && <div>{error}</div>}
      <MaterialTable
        title="Order List"
        isLoading={isLoading}
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
  );
}

export default withRouter(OderList)