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

  const seedCreators = async () => {
    const sampleCreators = [
      {
        name: 'Marques Brownlee',
        url: 'https://www.youtube.com/@mkbhd',
        description: 'Tech reviewer known for in-depth analysis of the latest gadgets and technology.',
        imageURL: ''
      },
      {
        name: 'Emma Chamberlain',
        url: 'https://www.youtube.com/@emmachamberlain',
        description: 'Lifestyle vlogger sharing daily life, fashion, and coffee adventures.',
        imageURL: ''
      },
      {
        name: 'MrBeast',
        url: 'https://www.youtube.com/@MrBeast',
        description: 'Philanthropist and content creator known for large-scale challenges and giveaways.',
        imageURL: ''
      },
      {
        name: 'Linus Tech Tips',
        url: 'https://www.youtube.com/@LinusTechTips',
        description: 'Tech channel covering PC builds, reviews, and tech industry news.',
        imageURL: ''
      },
      {
        name: 'Zoe Sugg',
        url: 'https://www.youtube.com/@Zoella',
        description: 'Beauty and lifestyle content creator sharing makeup tutorials and daily vlogs.',
        imageURL: ''
      }
    ];
    
    const { error } = await supabase.from('creators').insert(sampleCreators);
    if (error) {
      console.error('Error seeding creators:', error);
    }
  };

  const fetchCreators = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('creators').select();
    if (error) {
      console.error('Error fetching creators:', error);
      alert('Error loading creators. Please try again.');
      setLoading(false);
      return;
    }
    
    const creatorsList = data || [];
    
    // Seed creators if there are fewer than 5
    if (creatorsList.length < 5) {
      await seedCreators();
      // Fetch again after seeding
      const { data: newData, error: newError } = await supabase.from('creators').select();
      if (!newError) {
        setCreators(newData || []);
      } else {
        setCreators(creatorsList);
      }
    } else {
      setCreators(creatorsList);
    }
    
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

