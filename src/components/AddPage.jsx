import Header from "./includes/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import './styles/Pages.css';
import Footer from "./includes/Footer";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {proxy} from '../../package.json';

const AddPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserinfo] = useState({});
    const [croppedImage, setCroppedImage] = useState(null);

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

    const addPageFun = (e) => {
        e.preventDefault()
        let data = [];
        for (let index = 0; index < e.target.length - 1; index++) {
            const element = e.target[index].value;
            data.push(element)
        }
        const formData = new FormData();
        formData.append("file", croppedImage);
        croppedImage && formData.append("fileName", croppedImage.name)
        formData.append("userid", userInfo.id);

        Axios.post( proxy+"/addPage", formData, {headers : {data: JSON.stringify(data)}}).then(response => {
            console.log(response);
            console.log(response.status)
        });
    }


    // FIle Upload
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

        setCroppedImage(croppedImage);
        alert("Cropped Successfully Now You Can Submit The Form.")
    }

    return (
        <>
            <Header />
            <div className="addPage">
                <div className="mainBody">
                    <div className="leftMainBody">
                    <h1>Add Page</h1>
                    <form method="POST" action="" onSubmit={addPageFun}>
                        <input type="text" placeholder="Page Name" />
                        {/*<input type="text" placeholder="Page Type" />*/}
                        <select>
                            <option value="Public Company">Public Company</option>
                            <option value="Educational">Educational</option>
                            <option value="Self Employed">Self Employed</option>
                            <option value="Goverment Agency">Goverment Agency</option>
                            <option value="Non Profit">Non Profit</option>
                            <option value="Self Owned">Self Owned</option>
                            <option value="Privately Held">Privately Held</option>
                            <option value="Partnership">Partnership</option>
                        </select>   
                        <textarea placeholder="Compnay Address"></textarea>
                        <div style={{ "display": "flex" }}><select>
                            <option value="+91">+91 (India)</option>
                        </select>
                        <input type="text" placeholder="Page Phone Number" /></div>
                        <input type="text" placeholder="Page Email Address" />
                        <input type="text" placeholder="Page Founded Year" />
                        <textarea placeholder="Page Description" rows='3'></textarea>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        <input type="submit" value="Add Page" />
                    </form>
                    </div>
                    <div className="rightMainBody">
                        {src && (
                            <>  
                                <h1>Image Crop</h1>
                                <div style={{"marginTop":"8px", "height": "auto","width":"400px","background": "black" }}>
                                    <ReactCrop width="100%" src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                                </div>
                                <button className="cropBtn" onClick={getCroppedImg}>Crop</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddPage;