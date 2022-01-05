import * as React from "react";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import api from "./services/api";
import { create, fetch, update, remove } from "./services/http";
import FileUpload from "./components/FileUpload";
import ProductService from "./services/product.service";

function Product() {
  const [rowId, setRowId] = useState();
  const [upload, setUpload] = useState(false);
  const toggleUpload = () => {
    setUpload(true)
  };
  const toggleClose = () => {
    setUpload(false)
  };
  const imageUpdate = update => {
    setData([...update])
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(api.apiURL + api.product)
      .then(res => {
        for (let prod of res.data.data) {
          let image = JSON.parse(prod.imageUrl)
          if (prod.imageUrl) {
            prod.imageUrl = image.url;
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
        alert('Update Failed');
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
            render: tableData => {
              return (
                upload
                  &&
                  rowId === tableData.productId
                  ?
                  <FileUpload onClose={toggleClose}
                    imageUpdate={imageUpdate}
                    rowId={rowId}
                  />
                  :
                  tableData.imageUrl
                    ?
                    <img src={tableData.imageUrl} alt="" width="120" height="80" />
                    :
                    <span>No Product Img</span>
              )
            }
          },
          { title: "品名 (Product Name)", field: "productName", initialEditValue: "Cherry" },
          { title: "Desciption", field: "desciption" },
          { title: "RRP Price (CNY)", field: "priceRrp", type: "numeric" },
          { title: "Shopify Price (CNY)", field: "priceShopify", type: "numeric" },
          { title: "Agent Price (CNY)", field: "priceAgent", type: "numeric" },
          { title: "1212 Price (CNY)", field: "price1212", type: "numeric" },
          { title: "Special Price (CNY)", field: "priceSpecial", type: "numeric" },
          { title: "Weight (KG)", field: "weight", type: "numeric" },
          { title: "Package Qty", field: "packageQty", type: "numeric" },
        ]}
        data={tableData}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",
          headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '70vh'
        }}
        actions={[
          {
            icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>,
            onClick: (event, rowData) => {
              toggleUpload()
              setRowId(rowData.productId)
            },
            tooltip: 'Edit Product Image',
          }
        ]}
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