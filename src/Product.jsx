import * as React from "react";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import api from "./services/api";
import { create, fetch, update, remove } from "./services/http";
import FileUpload from "./components/FileUpload";
import ProductService from "./services/product.service";

function Product() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(api.apiURL + api.product)
      .then(res => {
        for (let prod of res.data.data) {
          if (prod.imageUrl) {
            prod.imageUrl = JSON.parse(prod.imageUrl).url
          }
        };
        isMounted && setData(res.data.data);
      })
      .catch(err => console.log(err));
    return () => isMounted = false;
  }, []);

  const tableData = data.map(ProductService.productMap);

  const onRowAdd = (newData, resolve) => {
    create(api.apiURL + api.productCreate, ProductService.productColumns(newData))
      .then(response => {
        const addData = [...tableData, newData]
        setData([...addData])
        resolve()
      })
  };

  const onRowDelete = (oldData, resolve) => {
    remove(`${api.apiURL}/api/Product/${oldData.productId}`)
      .then(response => {
        const index = oldData.tableData.id;
        const deleteProduct = [...tableData];
        deleteProduct.splice(index, 1);
        setData([...deleteProduct]);
        resolve();
      })
      .catch(error => {
        alert("delete failed");
      })
  }

  const onRowUpdate = (newData, oldData, resolve) => {
    update(api.apiURL + api.productUpdate, ProductService.productColumns(newData))
      .then(response => {
        const dataUpdate = [...tableData];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
      })
      .catch(error => {
        alert("Update Failed");
      })
    resolve();
  }

  return (
    <div className="mt-3">
      <MaterialTable
        title="Product"
        const columns={[
          {
            title: "Product Image", field: "imageUrl",
            editComponent: tableData =>  <FileUpload tableData={tableData} />,
            render: tableData => tableData.imageUrl
              ? <img src={tableData.imageUrl} alt="" width="120" height="80" />
              : <span>No Product Img</span>
          },
          { title: "品名 (Product Name)", field: "productName", initialEditValue: "Cherry", validate: tableData => tableData.productName === "" ? { isValid: false, helperText: "Name cannot be empty" } : true },
          { title: "Desciption", field: "desciption" },
          { title: "RRP Price (CNY)", field: "priceRrp", type: "numeric", validate: tableData => tableData.priceRrp > 10000 ? { isValid: false, helperText: "Must be less than 10000" } : true },
          { title: "Shopify Price (CNY)", field: "priceShopify", type: "numeric", validate: tableData => tableData.priceShopify > 10000 ? { isValid: false, helperText: "Must be less than 10000" } : true },
          { title: "Agent Price (CNY)", field: "priceAgent", type: "numeric", validate: tableData => tableData.priceAgent > 10000 ? { isValid: false, helperText: "Must be less than 10000" } : true },
          { title: "1212 Price (CNY)", field: "price1212", type: "numeric", validate: tableData => tableData.price1212 > 10000 ? { isValid: false, helperText: "Must be less than 10000" } : true },
          { title: "Special Price (CNY)", field: "priceSpecial", type: "numeric", validate: tableData => tableData.priceSpecial > 10000 ? { isValid: false, helperText: "Must be less than 10000" } : true },
          { title: "Weight (KG)", field: "weight", type: "numeric", validate: tableData => tableData.weight > 10000 ? { isValid: false, helperText: "Must be less than 10000" } : true },
          { title: "Package Qty", field: "packageQty", type: "numeric", validate: tableData => tableData.packageQty > 10000 ? { isValid: false, helperText: "Must be less than 10000" } : true },
        ]}
        data={tableData}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",
          headerStyle: { position: "sticky", top: 0 }, maxBodyHeight: "70vh"
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve) => {
              onRowAdd(newData, resolve)
            }),

          onRowDelete: oldData =>
            new Promise((resolve) => {
              onRowDelete(oldData, resolve)
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              onRowUpdate(newData, oldData, resolve)
            })
        }}
      />
    </div>
  )
}

export default withRouter(Product)