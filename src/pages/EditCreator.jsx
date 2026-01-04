import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('creators').select().eq('id', parseInt(id)).single();
    if (error) {
      console.error('Error fetching creator:', error);
      setFormData({ name: '', url: '', description: '', imageURL: '' });
    } else if (data) {
      setFormData({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || ''
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields (Name, URL, and Description)');
      return;
    }
    
    setSubmitting(true);
    
    const dataToUpdate = {
      name: formData.name.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      ...(formData.imageURL.trim() && { imageURL: formData.imageURL.trim() })
    };
    
    const { error } = await supabase.from('creators').update(dataToUpdate).eq('id', parseInt(id));
    if (error) {
      console.error('Error updating creator:', error);
      alert(`Error updating creator: ${error.message || 'Please try again.'}`);
      setSubmitting(false);
    } else {
      navigate(`/view/${id}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${formData.name}? This action cannot be undone.`)) {
      const { error } = await supabase.from('creators').delete().eq('id', parseInt(id));
      if (error) {
        console.error('Error deleting creator:', error);
        alert('Error deleting creator. Please try again.');
      } else {
        navigate('/');
      }
    }
  };

  if (loading) return (
    <div className="page-wrapper">
      <div className="container"><p>Loading...</p></div>
    </div>
  );

  if (!formData.name) {
    return (
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
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <Link to={`/view/${id}`} className="btn-back">← Back to Creator</Link>
        
        <div className="form-wrapper">
          <h1>Edit Creator</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
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
              />
            </div>

            <div className="button-group">
              <button 
                type="submit"
                className="btn-primary" 
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button"
                className="btn-danger" 
                onClick={handleDelete}
                disabled={submitting}
              >
                Delete Creator
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCreator;

