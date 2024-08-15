import { useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import styles from "./Cart.module.css";

const Card = ({
  id,
  title,
  content,
  date,
  tags,
  onPin,
  onShare,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editTags, setEditTags] = useState(tags.map(tag => `#${tag}`).join(' ')); // Format tags for editing

  const handleEditClick = () => {
    if (isEditing) {
      // Convert formatted tags back to an array
      const updatedTags = editTags
        .split(' ')
        .map(tag => tag.replace(/^#/, '').trim())
        .filter(tag => tag); // Remove empty strings
      onEdit(id, editTitle, editContent, updatedTags);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.container}>
      <BsFillPinAngleFill className={styles.pinIcon} onClick={() => onPin(id)} />
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
          <br />
        </div>
      ) : (
        <div className={styles.displayContent}>
          <h1>{title}</h1>
          <div className={styles.content}>
            <h3 className={styles.date}>{date}</h3>
            <p>{content}</p>
            <h4>
              {tags.map(tag => `#${tag}`).join(' ')} {/* Format tags for display */}
            </h4>
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
