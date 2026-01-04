import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ creator }) => {
  return (
    <div className="creator-card">
      {creator.imageURL && (
        <div className="card-image">
          <img src={creator.imageURL} alt={creator.name} />
        </div>
      )}
      <div className="card-content">
        <h3>{creator.name}</h3>
        <p className="card-description">{creator.description}</p>
        <div className="card-actions">
          <a href={creator.url} target="_blank" rel="noopener noreferrer" className="btn-visit">
            Visit Channel
          </a>
          <Link to={`/view/${creator.id}`} className="btn-view" style={{textDecoration: 'none'}}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;

