import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchCreators();
  }, [location.key]);

  const fetchCreators = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('creators').select();
    if (error) {
      console.error('Error fetching creators:', error);
      alert('Error loading creators. Please try again.');
    }
    setCreators(data || []);
    setLoading(false);
  };

  if (loading) return <div className="container"><p>Loading creators...</p></div>;

  return (
    <div className="page-wrapper">
      <div className="header">
        <h1 className="logo">✨ Creatorverse</h1>
        <Link to="/new" className="btn-add">Add Creator</Link>
      </div>
      
      <div className="container">
        {creators.length === 0 ? (
          <div className="empty-state">
            <h2>No creators yet!</h2>
            <p>Add your first content creator to get started.</p>
            <Link to="/new" className="btn-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>
              Add Your First Creator
            </Link>
          </div>
        ) : (
          <div className="creators-grid">
            {creators.map(creator => (
              <Card key={creator.id} creator={creator} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCreators;

