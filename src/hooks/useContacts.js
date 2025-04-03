import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch all users except the current user
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name')
          .neq('id', user.id);

        if (error) throw error;
        
        // Transform the data to match our contact format
        const formattedContacts = data.map(contact => ({
          id: contact.id,
          name: contact.display_name || 'Anonymous User',
          lastMessage: '',
          time: ''
        }));
        
        setContacts(formattedContacts);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [user]);

  return {
    contacts,
    loading,
    error
  };
}; 