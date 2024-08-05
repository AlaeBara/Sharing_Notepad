import React, { useState } from 'react';
import style from './Home.module.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag.trim()) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setCurrentTag('');
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className={style.container}>
      <button onClick={() => setShowModal(true)} className={style.addButton}>
        +
      </button>

      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <button onClick={closeModal} className={style.closeButton}>
              <img width="24" height="24" src="https://img.icons8.com/quill/50/delete-sign.png" alt="close"/>
            </button>

            <h2 className={style.title}>Add Note</h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={style.input}
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={style.textarea}
            />

            <div className={style.tagInputContainer}>
              <input
                type="text"
                placeholder="Add a tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className={style.tagInputField}
              />
              <button onClick={handleAddTag} className={style.addTagButton}>
                <img width="24" height="24" src="https://img.icons8.com/quill/50/filled-plus-2-math.png" alt="add"/>
              </button>
            </div>

            <div className={style.tagContainer}>
              {tags.map((tag, index) => (
                <div key={index} className={style.tag}>
                  <span># {tag}</span>
                  <button onClick={() => handleRemoveTag(index)} className={style.removeTagButton}>
                    <img width="12" height="12" src="https://img.icons8.com/material-rounded/24/delete-sign.png" alt="remove"/>
                  </button>
                </div>
              ))}
            </div>

            <button onClick={closeModal} className={style.addNote}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;