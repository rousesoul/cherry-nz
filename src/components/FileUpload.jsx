import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { fetch, create, update } from "../services/http";
import api from "../services/api";
import { Form, Button, Container } from "react-bootstrap";
import ProductService from "../services/product.service";

function FileUpload({ onClose, imageUpdate, rowId }) {
  const [upload, setUpload] = useState()
  const [data, setData] = useState([]);
  const UploadImage = (e) => {
    e.preventDefault()
    setUpload(e.target.files[0])
  }

  useEffect(() => {
    (async () => {
      await fetch(api.apiURL + api.product)
        .then(res => {
          for (let prod of res.data.data) {
            if (prod.imageUrl) {
              prod.imageUrl = JSON.parse(prod.imageUrl).url
            }
          }
          setData(res.data.data)
        })
        .catch(err => console.log(err))
    })();
    return null;
  }, [])

  const tableData = data.map(ProductService.productMap)

  const matchId = (imageUrl) => {
    let newData = {}
    for (let product of tableData) {
      if (rowId === product.productId) {
        newData = product
      }
    }

    const columns = {
      "productName": newData.productName,
      "priceRrp": parseInt(newData.priceRrp),
      "priceShopify": parseInt(newData.priceShopify),
      "priceAgent": parseInt(newData.priceAgent),
      "price1212": parseInt(newData.price1212),
      "priceSpecial": parseInt(newData.priceSpecial),
      "desciption": newData.desciption,
      "weight": parseInt(newData.weight),
      "packageQty": parseInt(newData.packageQty),
      "productId": parseInt(newData.productId),
      "imageUrl": `{"url":"${imageUrl}"}`
    }

    update(api.apiURL + api.productUpdate, columns)
      .then(() => {
        newData.imageUrl = imageUrl
        const dataUpdate = [...tableData]
        imageUpdate(dataUpdate)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const submitImage = (e) => {
    e.preventDefault()
    onClose()
    const file = upload;
    let formdata = new FormData();
    formdata.append("imageFile", file)
    create(api.apiURL + api.image, formdata)
      .then(res => {
        matchId(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Container
        style={{
          width: "210px",
          display: "flex",
          alignItems: "flex-end",
        }}>
        <Form.Group controlId="formFile" className="mb-2">
          <Form.Control type="file" onChange={e => UploadImage(e)} />
        </Form.Group>
      </Container>
      <Container
        style={{
          width: "210px",
          display: "flex",
          alignItems: "flex-end",
        }}>
        <Button
          className="btn btn-secondary"
          style={{ height: "38px", marginLeft: "5px", marginBottom: "5px" }}
          type="submit"
          onClick={submitImage}
        >Submit</Button>
        <Button
          className="btn btn-light"
          style={{ height: "38px", marginLeft: "5px", marginBottom: "5px" }}
          onClick={onClose}
        >Cancle</Button>
      </Container>
    </>
  );
}

export default withRouter(FileUpload)