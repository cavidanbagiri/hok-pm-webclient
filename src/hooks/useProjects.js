import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $api from '../http/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get user from Redux store
  const user = useSelector((state) => state.auth.user);
  
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await $api.get('/common/fetch_projects');
      setProjects(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch projects');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  return { projects, loading, error, refetch: fetchProjects };
};