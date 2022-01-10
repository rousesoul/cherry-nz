import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { create } from "../services/http";
import api from "../services/api";
import { Form, Button, Container } from "react-bootstrap";

function FileUpload({ tableData }) {
  const [upload, setUpload] = useState();
  const [progress, setProgress] = useState(0);

  const selectImage = e => {
    e.preventDefault();
    setUpload(e.target.files[0]);
  };

  const onUploadProgress = event => setProgress(Math.round((100 * event.loaded) / event.total));

  const uploadImage = e => {
    e.preventDefault();
    const file = upload;
    setProgress(0);
    let formdata = new FormData();
    formdata.append("imageFile", file);
    create(api.apiURL + api.image, formdata, { onUploadProgress })
      .then(res => {
        tableData.onChange(res.data);
      })
      .catch(() => setProgress(0));
  };

  return (
    <>
      <Container
        style={{
          width: "210px",
          display: "flex",
          alignItems: "flex-end",
        }}>
        <Form.Group controlId="formFile" className="mb-2">
          <Form.Control type="file" onChange={selectImage} />
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
          style={{ height: "36px" }}
          type="upload"
          onClick={uploadImage}
        >Upload</Button>
        <div className="w-100 h-100 mb-2 ms-2">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default withRouter(FileUpload)