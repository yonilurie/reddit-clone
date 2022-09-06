function ImageForm({ image, setImage }) {
	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};
	return (
        <div className="image-form-container">
            <label htmlFor='file' className='file-input'>Upload</label>
            <input id='file' type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={updateImage} ></input>
		</div>
	);
}

export default ImageForm;
