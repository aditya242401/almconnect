import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useNavigate } from 'react-router-dom';
import Footer from './includes/Footer';
import Header from './includes/Header';
import "./styles/UploadProfilePicture.css";
import {proxy} from '../../package.json';

const UploadProfilePicture = () => {
  const navigate = useNavigate();
  const [userInfo, setUserinfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      let loginid = localStorage.getItem("userId");
      // Set Login Data
      Axios.get( proxy+"/getDataById", { params: { loginid: loginid } }).then((response) => {
        setUserinfo(response.data[0]);
      });
    } else {
      navigate("/Login");
    }
  }, []);


  const [src, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const [crop, setCrop] = useState({ aspect: 9 / 9 });

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const getCroppedImg = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    // setResult(canvas.toDataURL('image/jpeg'));
    const reader = new FileReader()
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        dataURLtoFile(reader.result, 'cropped.jpg')
      }
    });
  }

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });

    uploadImageDataBase(croppedImage, croppedImage.name)
  }

  const uploadImageDataBase = (a, b) => {
    const formData = new FormData();
    formData.append("file", a);
    formData.append("fileName", b);
    formData.append("loginid", localStorage.getItem("userId"));

    Axios.post( proxy+"/uploadProfile", formData, { headers: { loginid: localStorage.getItem("userId") } }).then((res) => {
      if (res.data.uploadedFileName)
        alert("File Uploaded Successfully.");
      window.location.href = "/Profile";
    });
  }

  return (
    <>
      <Header />
      <div className='uploadProfilePicture'>
        <div className='main'>
          <div className='leftMain'>
            <h2 style={{"marginBottom": "8px"}}>Select a Profile Picture</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {src && (
            <div className='rightMain'>
              <div>
                <ReactCrop width="100%" src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
              </div>
              <button className='cropBtn' onClick={getCroppedImg}>Crop Image</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UploadProfilePicture;
