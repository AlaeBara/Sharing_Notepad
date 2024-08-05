import "./App.css";
import React, { useState } from "react";

import Card from "./component/card.jsx";
const App = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Note Title 1",
      content: "This is the note content.",
      date: "2024-08-03",
      tags: "tag1, tag2",
    },
    // Add more cards as needed
  ]);

  const handlePin = (id) => {
    console.log(`Pin icon clicked for card ${id}!`);
  };

  const handleShare = (id) => {
    console.log(`Share icon clicked for card ${id}!`);
  };

  const handleEdit = (id, newTitle, newContent, newTags) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, title: newTitle, content: newContent, tags: newTags }
          : card
      )
    );
    console.log(`Edit icon clicked for card ${id}!`);
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
    console.log(`Delete icon clicked for card ${id}!`);
  };

  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          content={card.content}
          date={card.date}
          tags={card.tags}
          onPin={handlePin}
          onShare={handleShare}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
