import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./churchForm.css";

const ChurchForm = ({ onChurchAdded }) => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("address", data.address);
      formData.append("website", data.website);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);

      const response = await axios.post("http://localhost:5000/api/churches", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Church added successfully!");
        onChurchAdded(response.data);
        reset();
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error adding church:", error);
    }
  };

  return (
    <div className="church-form-container">
      <h2>Add a New Church</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input type="text" {...register("name")} placeholder="Church Name" required />
        <input type="text" {...register("location")} placeholder="Location" required />
        <input type="text" {...register("address")} placeholder="Address" required />
        <input type="url" {...register("website")} placeholder="Website" />
        <textarea {...register("description")} placeholder="Description" required />
        
        <input type="file" {...register("image")} accept="image/*" onChange={handleImageChange} required />

        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "100px" }} />}

        <button type="submit">Add Church</button>
      </form>
    </div>
  );
};

export default ChurchForm;
