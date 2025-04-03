// Sample contacts data
export const contacts = [
  { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM' },
  { id: 2, name: 'Jane Smith', lastMessage: 'See you tomorrow!', time: '9:45 AM' },
  { id: 3, name: 'Mike Johnson', lastMessage: 'Thanks for your help!', time: 'Yesterday' },
  { id: 4, name: 'Sarah Brown', lastMessage: 'I need your help with this project.', time: '2:15 PM' },
  { id: 5, name: 'David Lee', lastMessage: 'Can you send me the report?', time: '1:30 PM' },
  { id: 6, name: 'Emily Chen', lastMessage: 'I have a question about the deadline.', time: '12:45 PM' },
  { id: 7, name: 'Michael Kim', lastMessage: 'I need to discuss the project with you.', time: '11:20 AM' },
  { id: 8, name: 'Olivia Patel', lastMessage: 'I have a question about the deadline.', time: '12:45 PM' },
  { id: 9, name: 'Daniel Nguyen', lastMessage: 'I need to discuss the project with you.', time: '11:20 AM' },
  { id: 10, name: 'Sophia Patel', lastMessage: 'I have a question about the deadline.', time: '12:45 PM' },
  { id: 11, name: 'Michael Kim', lastMessage: 'I need to discuss the project with you.', time: '11:20 AM' },
  { id: 12, name: 'Olivia Patel', lastMessage: 'I have a question about the deadline.', time: '12:45 PM' },
  { id: 13, name: 'Daniel Nguyen', lastMessage: 'I need to discuss the project with you.', time: '11:20 AM' },
];

// Initial messages for each contact
export const getInitialMessages = (contactId) => {
  return [
    { id: 1, text: 'Hey there!', sender: 'them', time: '10:30 AM' },
    { id: 2, text: 'Hi! How are you?', sender: 'me', time: '10:31 AM' },
  ];
}; 