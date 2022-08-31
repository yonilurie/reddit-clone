function ImageForm({ image, setImage }) {
	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};
	return (
		<div className="image-form-container">
			<input type="file" accept="image/*" onChange={updateImage}></input>
		</div>
	);
}

export default ImageForm;
