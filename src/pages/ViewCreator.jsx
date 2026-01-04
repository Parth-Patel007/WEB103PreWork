import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('creators').select().eq('id', parseInt(id)).single();
    if (error) {
      console.error('Error fetching creator:', error);
      setCreator(null);
    } else {
      setCreator(data);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!creator) return;
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      const { error } = await supabase.from('creators').delete().eq('id', parseInt(id));
      if (error) {
        console.error('Error deleting creator:', error);
        alert('Error deleting creator. Please try again.');
      } else {
        navigate('/');
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!creator) return (
    <div className="page-wrapper">
      <div className="container">
        <Link to="/" className="btn-back">← Back to All Creators</Link>
        <div className="empty-state">
          <h2>Creator not found</h2>
          <p>This creator may have been deleted.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        <Link to="/" className="btn-back">← Back to All Creators</Link>
        
        <div className="creator-detail">
          {creator.imageURL && (
            <img src={creator.imageURL} alt={creator.name} className="detail-image" />
          )}
          <h1>{creator.name}</h1>
          <p className="detail-description">{creator.description}</p>
          <p className="detail-url">
            <strong>Channel URL:</strong> <a href={creator.url} target="_blank" rel="noopener noreferrer">{creator.url}</a>
          </p>
          
          <div className="detail-actions">
            <a href={creator.url} target="_blank" rel="noopener noreferrer">
              <button className="btn-primary">Visit Channel</button>
            </a>
            <Link to={`/edit/${creator.id}`}>
              <button className="btn-secondary">Edit</button>
            </Link>
            <button className="btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;

