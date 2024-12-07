import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import ProductContext from "../context/product/ProductContext";
function UploadImage({imageUrls,setImageUrls}) {
  const {upload_loading,dispatch}=useContext(ProductContext)
  const images = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const handleMultipleUpload = async (event) => {
    dispatch({
      type: "SET_UPLOAD_LOADING",
      payload: true
    })
    const files = Array.from(event.target.files); // Convert FileList to an array

    const promises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "GamersHaven"); // Replace 'your_preset' with your Cloudinary preset

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dpsckqdgz/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      dispatch({
        type: "SET_UPLOAD_LOADING",
        payload: false
      })
      return data.secure_url;
    });

    try {
      const urls = await Promise.all(promises); // Resolve all upload promises
      console.log(urls)
      setImageUrls(urls);
      alert("Images Added Successfully")
      // const newImages={
      //   images:urls
      // }
      // const response=await images.put('/api/v1/products/67312af32f76221e0d68a544',newImages)
      // console.log(response.data)
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
      <input
        type="file"
        className="file-input-primary file-input-md w-full max-w-xs p-3"
        multiple
        onChange={handleMultipleUpload}
      />
  );
}

export default UploadImage;
