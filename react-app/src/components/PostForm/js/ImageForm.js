import React, { useState } from "react";
function ImageForm({ image, setImage }) {
	const [imageError, setImageError] = useState("");

	//Updates image when user inoputs file
	// Also checks for any errors witht the image
	const updateImage = (e) => {
		const file = e.target.files[0];
		setImageError(null);
		let testImage = new Image();
		// If file size is too large show an error
		testImage.onload = function () {
			if (file.size > 5000000) {
				setImage(null);
				return setImageError("File size must be less than 5 MB");
			}
			setImage(file);
		};
		// If image does not load show an error
		testImage.onerror = function () {
			setImage(null);
			setImageError("Invalid Image, please try another one");
		};
		//Create image to run previous tests
		testImage.src = URL.createObjectURL(file);
	};
	return (
		<div className="image-form-container">
			<div className="image-upload-error">{imageError}</div>
			<label htmlFor="file" className="file-input">
				{!image && "Upload"}
				{image && "Change Image"}
			</label>
			<input
				id="file"
				type="file"
				accept="image/png, image/jpg, image/jpeg, image/gif"
				onChange={updateImage}
			></input>
			{!image && (
				<div className="image-upload-info">
					Upload a file ending in: .png, .jpg, .jpeg, or .gif
				</div>
			)}
			{image && (
				<div className="image-upload-name">File name: {image.name}</div>
			)}
			{image && (
				<img
					className="preview-image-upload"
					src={URL.createObjectURL(image)}
					alt="preview"
				></img>
			)}
		</div>
	);
}

export default ImageForm;
