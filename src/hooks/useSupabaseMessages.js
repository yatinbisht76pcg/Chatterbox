import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const useSupabaseMessages = (selectedContactId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    // Fetch existing messages when a contact is selected
    useEffect(() => {
        if (!user || !selectedContactId) return;

        const fetchMessages = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch messages where the current user is either sender or receiver
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
                    .or(`sender_id.eq.${selectedContactId},receiver_id.eq.${selectedContactId}`)
                    .order('created_at', { ascending: true });

                if (error) throw error;

                setMessages(data || []);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError('Failed to load messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();

        // Subscribe to new messages
        const subscription = supabase
            .channel('realtime:messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    //   filter: `sender_id=eq.${user.id},receiver_id=eq.${selectedContactId}` 
                    // not needed as we are subscribing to all messages and we have policy already set up
                },
                (payload) => {
                    console.log('New message received:', payload);
                    setMessages(prev => [...prev, payload.new]);
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [user, selectedContactId]);

    const sendMessage = async (messageText) => {
        if (!user || !selectedContactId) return;

        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    sender_id: user.id,
                    receiver_id: selectedContactId,
                    message: messageText
                });

            if (error) throw error;

            return { success: true };
        } catch (err) {
            console.error('Error sending message:', err);
            return { success: false, error: err.message };
        }
    };

    return {
        messages,
        loading,
        error,
        sendMessage
    };
}; 