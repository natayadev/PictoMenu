import React, { Component } from "react";
import "./SubirLogo.css";

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  uploadSingleFile(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
    });
  }

  upload(e) {
    e.preventDefault();
    console.log(this.state.file);
  }

  render() {
    let imgPreview;
    if (this.state.file) {
      imgPreview = (
        <img id="avatar" src={this.state.file} width="125px" height="125px" />
      );
    }
    return (
      <form id="formAvatar">
        <div className="inputUpload">
          <input type="file" onChange={this.uploadSingleFile} />
          <div id="vistaPrevia" className="form-group preview">
            {imgPreview}
          </div>
        </div>
        <button type="button" className="botonUpload" onClick={this.upload}>
          Subir
        </button>
      </form>
    );
  }
}
