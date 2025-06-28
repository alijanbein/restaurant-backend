const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    const imagePath = `/images/${req.file.filename}`;
    res.status(200).json({ message: "Image uploaded", path: imagePath });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

module.exports = router;
