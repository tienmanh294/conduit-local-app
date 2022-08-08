/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
import { React, useState } from 'react';
import Dropzone from 'react-dropzone';
import Modal from '../Modal';
import { useUploadImageMutation } from '../../api/userApiSlice';
import classes from './Upload.module.css';

const UploadAvatar = props => {
  const { onClose } = props;
  const [imageData, setImageData] = useState(null);
  const [previewSource, setPreviewSource] = useState('');
  const [upload, { isLoading }] = useUploadImageMutation();
  const handleUpload = async e => {
    const formData = new FormData();
    formData.append('avatar', imageData);
    await upload(formData);
    onClose();
  };
  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const onDrop = files => {
    setImageData(files[0]);
    previewFile(files[0]);
  };
  return (
    <Modal onClose={onClose}>
      {isLoading && <p>Uploading...</p>}
      {previewSource ? (
        <img
          src={previewSource}
          alt="chosen"
          style={{ height: '300px' }}
        />
      ) : (
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxSize={80000000}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className="modal-content__upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag to drop image here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      )}
      <div>
        <button className="button--alt" onClick={() => onClose()}>Close</button>
        <button className={isLoading ? 'new-article__btn-notvalid' : 'upload__btn-valid'} onClick={handleUpload} disabled={isLoading}>
          Upload
        </button>
      </div>
    </Modal>
  );
};

export default UploadAvatar;
