import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import notificationIcon from "../assest/Notification_icon.png";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false); // Toggle notifications
  const navigate = useNavigate();

  // Sample shared notes with user information
  const [sharedNotes, setSharedNotes] = useState([
    {
      id: 1,
      title: "Note Title 1",
      content: "This is the content of Note 1",
      sharedBy: "Alice", // User who shared the note
      accepted: null,
    },
    {
      id: 2,
      title: "Note Title 2",
      content: "This is the content of Note 2",
      sharedBy: "Bob", // User who shared the note
      accepted: null,
    },
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleAccept = (id) => {
    setSharedNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, accepted: true } : note
      )
    );
    console.log(`Accepted note with id: ${id}`);
  };

  const handleDecline = (id) => {
    setSharedNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, accepted: false } : note
      )
    );
    console.log(`Declined note with id: ${id}`);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoLink}>
          <Link to={"/"}>
            <Logo w={120} h={70} />
          </Link>
        </div>
        <div className={styles.searchBarLg}>
          <input
            type="text"
            placeholder="Search here..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <GrSearch />
          </button>
        </div>
        <div className={styles.userActions}>
          <button onClick={handleLogout} className={styles.logoutLink}>
            Logout
          </button>
          <div
            className={styles.notificationIcon}
            onClick={toggleNotifications}
          >
            <img
              src={notificationIcon}
              alt="Notification"
              width="24"
              height="24"
            />
          </div>
          {showNotifications && (
            <div className={styles.notificationPopup}>
              <div className={styles.popupContent}>
                <h3>Shared Notes</h3>
                {sharedNotes.map((note) => (
                  <div key={note.id} className={styles.notificationItem}>
                    <span>
                      <strong>{note.sharedBy}</strong> shared a note:{" "}
                      {note.title}
                    </span>
                    <div className={styles.buttonContainer}>
                      <button
                        onClick={() => handleAccept(note.id)}
                        className={styles.acceptButton}
                        disabled={note.accepted !== null}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(note.id)}
                        className={styles.declineButton}
                        disabled={note.accepted !== null}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
