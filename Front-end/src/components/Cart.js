import { useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import styles from "./Cart.module.css";

const Card = ({ id, title, content, date, tags, onPin, onShare, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editTags, setEditTags] = useState(
    tags.map((tag) => `#${tag}`).join(" ")
  );

  const handleEditClick = () => {
    setIsEditing(!isEditing);
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
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        const updatedNoteFromServer = await response.json();
        console.log("Update successful:", updatedNoteFromServer);

        // Update the state with the new data
        setEditTitle(updatedNoteFromServer.note.title);
        setEditContent(updatedNoteFromServer.note.content);
        setEditTags(
          updatedNoteFromServer.note.tags.map((tag) => `#${tag}`).join(" ")
        );
      } else {
        console.error("Update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }

    setIsEditing(false); // Exit edit mode after updating
  };

  return (
    <div className={styles.container}>
      <BsFillPinAngleFill
        className={styles.pinIcon}
        onClick={() => onPin(id)}
      />
      {isEditing ? (
        <div className={styles.editContent}>
          <br />
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
          <br />
          <button className={styles.UpdateButton} onClick={handleUpdateClick}>
            Update
          </button>
          <br />
        </div>
      ) : (
        <div className={styles.displayContent}>
          <h1>{editTitle}</h1>
          <div className={styles.content}>
            <h3 className={styles.date}>{date}</h3>
            <p>{editContent}</p>
            <h4>{editTags}</h4>
          </div>
        </div>
      )}
      <div className={styles.iconsNote}>
        <IoMdShareAlt onClick={() => onShare(id)} />
        <MdModeEditOutline onClick={handleEditClick} />
        <MdDelete onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};

export default Card;
