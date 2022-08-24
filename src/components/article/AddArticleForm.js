/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { React,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateArticleMutation } from '../../api/articleApiSlice';
import useInput from '../../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
function AddArticleForm() {
  const [create, { isLoading }] = useCreateArticleMutation();
  const [error,setErr]=useState('');
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,

  } = useInput(isNotEmpty);
  const {
    value: aboutValue,
    isValid: aboutIsValid,
    hasError: aboutHasError,
    valueChangeHandler: aboutChangeHandler,
    inputBlurHandler: aboutBlurHandler,

  } = useInput(isNotEmpty);
  const {
    value: contentValue,
    isValid: contentIsValid,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,

  } = useInput(isNotEmpty);
  const {
    value: tagsValue,
    valueChangeHandler: tagsChangeHandler,
    inputBlurHandler: tagsBlurHandler,
  } = useInput(isNotEmpty);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    const tagList = tagsValue.split(' ').join('').split(',');
    const articleData = {
      title: titleValue,
      description: aboutValue,
      body: contentValue,
      tags: tagList,
    };
    const slug = titleValue.replace(/<[^>]*>|[^a-zA-Z0-9 ]/g,'-').replace(/ /g, '-');
    try {
      await create(articleData).unwrap();
      if (!isLoading) {
        navigate(`/article/${slug}`);
      }
    } catch (err) {
      setErr(err.data);
    }
    
  };

  const formIsValid = !!(titleIsValid && aboutIsValid && contentIsValid);

  return (
    <div className="new-article">
      {error!==''&&<p className='errmsg'>{error}</p>}
      <fieldset className="new-article__form">
        <div className="new-article__control">
          <input
            type="text"
            required
            id="title"
            value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            placeholder="Article Title"
          />
          {titleHasError && <p>Please enter a title</p>}
        </div>
        <div className="new-article__control">
          <input
            type="text"
            required
            id="about"
            value={aboutValue}
            onChange={aboutChangeHandler}
            onBlur={aboutBlurHandler}
            placeholder="What's this article about?"
          />
          {aboutHasError && <p>Please enter a description</p>}
        </div>
        <div className="new-article__control">
          <textarea
            id="content"
            required
            rows="5"
            value={contentValue}
            onChange={contentChangeHandler}
            onBlur={contentBlurHandler}
            placeholder="Write your tarticle (in markdown)"
          />
          {contentHasError && <p>Please enter a body</p>}
        </div>
        <div className="new-article__control">
          <input
            type="text"
            required
            id="tags"
            value={tagsValue}
            onChange={tagsChangeHandler}
            onBlur={tagsBlurHandler}
            placeholder="Enter tags, tag separate by comma"
          />
        </div>
        <div className={formIsValid && !isLoading ? 'new-article__btn-valid' : 'new-article__btn-notvalid'}>
          <button onClick={handleSubmit} disabled={!formIsValid && isLoading}>Publish Article</button>
        </div>
      </fieldset>
    </div>
  );
}

export default AddArticleForm;
