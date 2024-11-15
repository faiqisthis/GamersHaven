import React, { useState } from "react";
import axios from "axios";

function MultiImageUpload() {
  const [imageUrls, setImageUrls] = useState([]);
  const images = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const handleMultipleUpload = async (event) => {
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
      return data.secure_url;
    });

    try {
      const urls = await Promise.all(promises); // Resolve all upload promises
      setImageUrls(urls);
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
    <div>
      <input type="file" multiple onChange={handleMultipleUpload} />
      <div>
        {imageUrls.map((url, index) => (
          <p key={index}>{url}</p>
        ))}
      </div>
    </div>
  );
}

export default MultiImageUpload;
