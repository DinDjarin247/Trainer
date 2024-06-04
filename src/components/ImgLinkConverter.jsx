import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ImgLinkConverter = ({ onUpload }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    uploadFile(file);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      setImageUrl(data.filePath);
      if (onUpload) onUpload(data.filePath);
      setError("");
      console.log("Image uploaded. URL:", data.filePath); // Added log
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 8,
        padding: 20,
        textAlign: "center",
        marginBottom: 20,
      }}
    >
      <Typography variant="body1" mb={2}>
        Drag & Drop an image file here or click the button to upload.
      </Typography>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        component="label"
        sx={{ minWidth: 120 }}
      >
        Upload
        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadFile(e.target.files[0])}
          hidden
        />
      </Button>
      {error && (
        <Typography color="error" variant="body2" mt={2}>
          {error}
        </Typography>
      )}
      {imageUrl && (
        <Box mt={2}>
          <Typography variant="body2">Uploaded Image URL:</Typography>
          <Typography variant="body2">{imageUrl}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImgLinkConverter;
