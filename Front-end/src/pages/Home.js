import React, { useState } from 'react';
import style from './Home.module.css';
import Cart from '../components/Cart';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const history = useNavigate()

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

  const addnote = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/note/addnote', {
        title: title,
        content: content,
        tags: tags
      }, {
        withCredentials: true
      });

      if (response.status === 201) {
        toast.success("Note added successfully!");
        resetForm();
        setShowModal(false);
        history('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  // Cart data and handlers
  const cardData = {
    id: 1,
    title: "Sample Card Title",
    content: "This is the sample content for the card.",
    date: "2024-08-05",
    tags: "sample, demo, example",
  };

  const handlePin = (id) => {
    console.log(`Pinned card with id: ${id}`);
  };

  const handleShare = (id) => {
    console.log(`Shared card with id: ${id}`);
  };

  const handleEdit = (id, title, content, tags) => {
    console.log(`Edited card with id: ${id}, new title: ${title}, new content: ${content}, new tags: ${tags}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleted card with id: ${id}`);
  };

  return (
    <>
      <Header />

      <div className={style.yourNote}>
        <Cart
          id={cardData.id}
          title={cardData.title}
          content={cardData.content}
          date={cardData.date}
          tags={cardData.tags}
          onPin={handlePin}
          onShare={handleShare}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

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

              <button onClick={addnote} className={style.addNote}>Add</button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;