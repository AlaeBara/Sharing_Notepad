import { useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { GrPin } from "react-icons/gr";
import { IoMdShareAlt } from "react-icons/io";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Cart.module.css";
import axios from "axios";

const Card = ({ id, title, content, date, tags,pinned, onPin, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [shareEmails, setShareEmails] = useState("");
  const [editTags, setEditTags] = useState(
    tags.map((tag) => `#${tag}`).join(" ")
  );

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isSharing) setIsSharing(false); 
  };

  const handleshareClick = () => {
    setIsSharing(!isSharing);
    if (isEditing) setIsEditing(false); 
  };

  const handleUpdateClick = async () => {
    const updatedTags = editTags
      .split(" ")
      .map((tag) => tag.replace(/^#/, "").trim())
      .filter((tag) => tag);

    const updatedNote = {
      title: editTitle,
      content: editContent,
      tags: updatedTags,
    };

    try {
      console.log("id:", id);
      const response = await axios.put(
        `http://localhost:5000/api/note/updatenote/${id}`,
        updatedNote,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { note: updatedNoteFromServer } = response.data;
        toast.success("Update successful");
        // Update the state with the new data
        setEditTitle(updatedNoteFromServer.title);
        setEditContent(updatedNoteFromServer.content);
        setEditTags(
          updatedNoteFromServer.tags.map((tag) => `#${tag}`).join(" ")
        );
      } else {
        alert("error updating note");
        console.error("Update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }

    setIsEditing(false);
  };

  const handleShare = (id) => {
    axios.post(`http://localhost:5000/api/note/sharenote/${id}`, { shareEmail: shareEmails}, {
      withCredentials: true,
    })
      .then(response => {
        console.log("Note shared successfully:", response.data);
        toast.success("Note shared successfully!");
        setIsSharing(false); 
        setShareEmails(""); 
      })
      .catch(error => {
        console.error("Error sharing note:", error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error sharing note");
        }
      });
  };

  return (
    <>
      <div className={styles.container}>

      {/* Conditionally render pin icon */}

      {pinned ? (
          <BsFillPinAngleFill className={styles.pinIcon} onClick={() => onPin(id)} />
        ) : (
          <GrPin className={styles.pinIcon} onClick={() => onPin(id)} />
        )}


        {!isEditing && !isSharing && (
          <div className={styles.displayContent}>
            <h1>{editTitle}</h1>
            <div className={styles.content}>
              <h3 className={styles.date}>{date}</h3>
              <p>{editContent}</p>
              <h4>{editTags}</h4>
            </div>
          </div>
        )}

        {isEditing && (
          <div className={styles.editContent}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            ></textarea>
            <input
              type="text"
              value={editTags}
              onChange={(e) => setEditTags(e.target.value)}
            />
            <button className={styles.UpdateButton} onClick={handleUpdateClick}>
              Update
            </button>
          </div>
        )}

        {isSharing && (
          <div className={styles.shareContent}>
            <form
              onSubmit={(e) => {
                e.preventDefault(); 
                handleShare(id);    
              }}
            >
              <input
                type="email" 
                placeholder="Enter email"
                value={shareEmails}
                onChange={(e) => setShareEmails(e.target.value)}
                required 
              />
              <button type="submit">Share</button>
            </form>
          </div>
        )}


        <div className={styles.iconsNote}>
          <IoMdShareAlt onClick={handleshareClick} />
          <MdModeEditOutline onClick={handleEditClick} />
          <MdDelete onClick={() => onDelete(id)} />
        </div>
      </div>

      <ToastContainer />

    </>
  );
};

export default Card;