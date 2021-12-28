import * as React from "react";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import api from "./services/api";
import { fetch } from "./services/http";
import XLSX from "xlsx";

const extensions = ["xlsx", "xls", "csv"];

function OrderList() {
  const columnsOriginal = [
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
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(columnsOriginal);

  const getExtension = file => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return extensions.includes(extension);
  }

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach(row => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows
  }

  useEffect(() => {
    let isMounted = true;
    fetch(api.apiURL + api.order)
      .then(res => {
        isMounted && setIsLoading(false);
        isMounted && setData(res.data.data);
        isMounted && setError(null);
      })
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("fetch aborted")
        } else {
          isMounted && setIsLoading(false);
          console.log(err.message);
        }
      });
    return () => isMounted = false;
  }, [])

  const importExcel = e => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      const bstr = e.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      const headers = fileData[0];
      const heads = headers.map(head => ({ title: head, field: head }));
      setColumns(heads);

      fileData.splice(0, 1);
      setData(convertToJson(headers, fileData));
    }
    file ?
      (getExtension(file) ? reader.readAsBinaryString(file) : alert("Invalid file input, Select Excel, CSV file"))
      :
      (setData([])) && (setColumns([]));
  }

  return (
    <div className="mt-3">
      {error && <div>{error}</div>}
      <div className="text-nowrap ms-3 mb-3">You can import an xlsx, xls or csv file here:<input type="file" onChange={importExcel} className="ms-3" /></div>
      <MaterialTable
        title="Order List"
        isLoading={isLoading}
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first", exportButton: true, exportAllData: true }}
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

export default withRouter(OrderList)