/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import { useState, React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateArticleMutation,

} from '../../api/articleApiSlice';

const isNotEmpty = value => value.trim() !== '';
function EditArticleForm(props) {
  const { slug } = useParams();
  const { title, about, content, tags } = props;
  const [titleValue, setTitle] = useState(title);
  const [aboutValue, setAbout] = useState(about);
  const [contentValue, setContent] = useState(content);
  const [tagsValue, setTags] = useState(tags);

  const [enteredTitleTouched, setEnteredTitleTouched] = useState(true);
  const [enteredAboutTouched, setEnteredAboutTouched] = useState(true);
  const [enteredBodyTouched, setEnteredBodyTouched] = useState(true);
  const enteredTitleIsValid = isNotEmpty(titleValue);
  const enteredAboutIsValid = isNotEmpty(aboutValue);
  const enteredBodyIsValid = isNotEmpty(contentValue);
  const titleInputIsValid = enteredTitleIsValid && enteredTitleTouched;
  const aboutInputIsValid = enteredAboutIsValid && enteredAboutTouched;
  const bodyInputIsValid = enteredBodyIsValid && enteredBodyTouched;

  const formIsValid = !!(titleInputIsValid && aboutInputIsValid && bodyInputIsValid);

  const navigate = useNavigate();
  const [update] = useUpdateArticleMutation(slug);
  const handleSubmit = async () => {
    // e.preventDefault();
    const tagList = tagsValue.toString().split(' ').join('').split(',');
    const articleData = {
      title: titleValue,
      description: aboutValue,
      body: contentValue,
      tags: tagList,
    };

    await update({ slug, ...articleData }).unwrap();
    const slugAfter = titleValue.replace(/ /g, '-');
    navigate(`/article/${slugAfter}`);
  };
  const titleInputHandleChange = event => setTitle(event.target.value);

  function aboutInputHandleChange(event) {
    setAbout(event.target.value);
  }
  function contentInputHandleChange(event) {
    setContent(event.target.value);
  }
  function tagsInputHandleChange(event) {
    setTags(event.target.value);
  }
  const handleBlurTitle = () => {
    setEnteredTitleTouched(true);
  };
  const handleBlurAbout = () => {
    setEnteredAboutTouched(true);
  };
  const handleBlurBody = () => {
    setEnteredBodyTouched(true);
  };
  return (
    <div className="new-article">
      <fieldset className="new-article__form">
        <div className="new-article__control">
          <input
            type="text"
            required
            id="title"
            value={titleValue}
            onChange={titleInputHandleChange}
            onBlur={handleBlurTitle}
          />
          {!titleInputIsValid && <p>Please enter a title</p>}
        </div>
        <div className="new-article__control">
          <input
            type="text"
            required
            id="about"
            value={aboutValue}
            onChange={aboutInputHandleChange}
            onBlur={handleBlurAbout}
          />
          {!aboutInputIsValid && <p>Please enter a description</p>}
        </div>
        <div className="new-article__control">
          <textarea
            id="content"
            required
            rows="5"
            value={contentValue}
            onChange={contentInputHandleChange}
            onBlur={handleBlurBody}
          />
          {!bodyInputIsValid && <p>Please enter a content</p>}
        </div>
        <div className="new-article__control">
          <input
            type="text"
            required
            id="tags"
            value={tagsValue.toString()}
            onChange={tagsInputHandleChange}
          />
        </div>
        <div className="new-article__btn-valid">
          <button onClick={() => handleSubmit()} disabled={!formIsValid}>Publish Article</button>
        </div>
      </fieldset>
    </div>
  );
}

export default EditArticleForm;
