function ImageForm({ image, setImage }) {
	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};
	return (
		<div className="image-form-container">
			<label htmlFor="file" className="file-input">
				Upload
			</label>
			<input
				id="file"
				type="file"
				accept="image/png, image/jpg, image/jpeg, image/gif"
				onChange={updateImage}
			></input>
			{!image && <div className="image-upload-info">Upload a file ending in: .png, .jpg, .jpeg, or .gif</div>}
			{image && (
				<div className="image-upload-name">File name: {image.name}</div>
			)}
			{image && (
				<img
					className="preview-image-upload"
					src={URL.createObjectURL(image)}
				></img>
			)}
		</div>
	);
}

export default ImageForm;
