/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { useUploadSingleVideoMutation } from '../../api/articleApiSlice';

function VideoArticleForm() {
  // const [create, { isLoading }] = useCreateArticleMutation();
  const [uploadVideo, { isLoading }] = useUploadSingleVideoMutation();
  const [videoData, setVideoData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    const slug = videoData.name.replace(/ /g, '-').split('.')[0];
    // await create(articleData).unwrap();
    const formData = new FormData();
    formData.append('video', videoData);
    await uploadVideo(formData);
    if (!isLoading) {
      navigate(`/article/${slug}`);
    }
  };

  const onDrop = files => {
    setVideoData(files[0]);
  };

  const formIsValid = videoData !== null;

  return (
    <div className="new-article">
      <fieldset className="new-article__form">
        <div className="new-article__control">
          {videoData !== null ? (
            <video width="400" controls>
              <source src={URL.createObjectURL(videoData)} />
              <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
            </video>
          ) : (
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              maxSize={80000000}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div className="div-video" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag to drop some video here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          )}

        </div>
        <div className="new-article__control">
          <input
            type="text"
            required
            id="tags"
            defaultValue="video"
          />
        </div>
        <div className={formIsValid ? 'new-article__btn-valid' : 'new-article__btn-notvalid'}>
          <button onClick={handleSubmit} disabled={!formIsValid}>Publish Article</button>
        </div>
      </fieldset>
    </div>
  );
}

export default VideoArticleForm;
