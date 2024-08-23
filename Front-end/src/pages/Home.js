import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import Cart from "../components/Cart";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (currentTag.trim()) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setCurrentTag("");
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Add note
  const addNote = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/addnote",
        {
          title,
          content,
          tags,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Note added successfully!");
        resetForm();
        setShowModal(false);
        fetchNotes(); // Fetch notes again to update the list
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again later.");
      }
    }
  };

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/note/allnote",
        {
          withCredentials: true,
        }
      );
      setNotes(response.data.notes);
    } catch (error) {
      toast.error("Failed to fetch notes.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  const handleShare = (id) => {
    console.log(`Shared card with id: ${id}`);
  };

  const handleEdit = (id, title, content, tags) => {
    console.log(
      `Edited card with id: ${id}, new title: ${title}, new content: ${content}, new tags: ${tags}`
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/note/deletenote/${id}`, {
        withCredentials: true,
      });
      toast.success("Note deleted successfully!");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to delete note.");
      console.error(error);
    }
  };


  const handlePin = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/note/pinnote/${id}`,{}, {
        withCredentials: true,
      });
      // toast.success("Note Pinned successfully!");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to Pinned note.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />

      <div className={style.yourNote}>
        {notes.length > 0 ? (
          notes.map((cardData) => (
            <Cart
            key={cardData._id}
            id={cardData._id}
            title={cardData.title}
            content={cardData.content}
            date={cardData.createdAt}
            tags={cardData.tags}
            pinned={cardData.pinned}  // Pass the pinned status
            onPin={() => handlePin(cardData._id)}
            onShare={() => handleShare(cardData._id)}
            onEdit={() => handleEdit(cardData._id)}
            onDelete={() => handleDelete(cardData._id)}
          />
          ))
        ) : (
          <h2 className={style.noNotes}>No notes available</h2>
        )}
      </div>

      <div className={style.container}>
        <button onClick={() => setShowModal(true)} className={style.addButton}>
          +
        </button>

        {showModal && (
          <div className={style.modalOverlay}>
            <div className={style.modal}>
              <button onClick={closeModal} className={style.closeButton}>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/quill/50/delete-sign.png"
                  alt="close"
                />
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
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/quill/50/filled-plus-2-math.png"
                    alt="add"
                  />
                </button>
              </div>

              <div className={style.tagContainer}>
                {tags.map((tag, index) => (
                  <div key={index} className={style.tag}>
                    <span># {tag}</span>
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className={style.removeTagButton}
                    >
                      <img
                        width="12"
                        height="12"
                        src="https://img.icons8.com/material-rounded/24/delete-sign.png"
                        alt="remove"
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={addNote} className={style.addNote}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
