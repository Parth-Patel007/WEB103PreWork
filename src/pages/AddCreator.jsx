import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields (Name, URL, and Description)');
      return;
    }
    
    setSubmitting(true);
    
    const dataToInsert = {
      name: formData.name.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      ...(formData.imageURL.trim() && { imageURL: formData.imageURL.trim() })
    };
    
    const { data, error } = await supabase.from('creators').insert([dataToInsert]).select();
    
    if (error) {
      console.error('Error adding creator:', error);
      alert(`Error adding creator: ${error.message || 'Please try again.'}`);
      setSubmitting(false);
    } else {
      setFormData({ name: '', url: '', description: '', imageURL: '' });
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <Link to="/" className="btn-back">← Back to All Creators</Link>
        
        <div className="form-wrapper">
          <h1>Add New Creator</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Marques Brownlee"
                required
              />
            </div>

            <div className="form-group">
              <label>URL *</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://youtube.com/@channelname"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What content do they create?"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL (optional)</label>
              <input
                type="url"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <small style={{color: '#b8b8d1', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>
                Provide a direct link to an image
              </small>
            </div>

            <button 
              type="submit"
              className="btn-primary" 
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Creator'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCreator;

