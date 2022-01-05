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

  const emportExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'orders');
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
    XLSX.writeFile(workBook, 'OrdersList.xlsx');
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
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        actions={[
          {
            icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>,
            onClick: () => emportExcel(),
            tooltip: "Export to Excel",
            isFreeAction: true
          }
        ]}
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