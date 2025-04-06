// ChurchCard.jsx
import React from 'react';
import { Heart } from 'lucide-react';
import './ChurchCard.css';

const ChurchCard = ({
  id,
  name,
  description,
  location,
  image,
  isSaved,
  onSave,
}) => {
  return (
    <div className="church-card">
      <div className="card-image-container">
        <img
          src={`${image}?auto=format&fit=crop&w=800&q=80`}
          alt={name}
          className="card-image"
          loading="lazy"
        />
        <button
          onClick={() => onSave(id)}
          className="heart-button"
        >
          <Heart
            className={`heart-icon ${isSaved ? 'saved' : ''}`}
          />
        </button>
      </div>

      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
        <div className="card-location">{location}</div>
      </div>
    </div>
  );
};

export default ChurchCard;
