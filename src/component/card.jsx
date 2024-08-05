import { useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import "./card.css";

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
  const [editTags, setEditTags] = useState(tags);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit(id, editTitle, editContent, editTags);
    }
  };

  return (
    <div className="container">
      <BsFillPinAngleFill className="pin-icon" onClick={() => onPin(id)} />
      {isEditing ? (
        <div className="edit-content">
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
        </div>
      ) : (
        <div className="display-content">
          <h1>{title}</h1>
          <div className="content">
            <h3 className="date">{date}</h3>
            <p>{content}</p>
            <h4>{tags}</h4>
          </div>
        </div>
      )}
      <div className="icons-note">
        <IoMdShareAlt onClick={() => onShare(id)} />
        <MdModeEditOutline onClick={handleEditClick} />
        <MdDelete onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};

export default Card;
