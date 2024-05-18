import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Archived = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('/email/c/archived'); 
        setEmails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleUnarchive = async (emailId) => {
    try {
      await axios.patch(`/email/${emailId}`, { archived: false });
      setEmails(emails.filter((email) => email._id !== emailId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (emailId) => {
    try {
      await axios.delete(`/email/${emailId}`);
      setEmails(emails.filter((email) => email._id !== emailId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Archived</h1>
      <ul>
        {emails.map((email) => (
          <li key={email._id}>
            <p>From: {email.sender.email}</p>
            <p>To: {email.recipients.map((recipient) => recipient.email).join(', ')}</p>
            <p>Time: {new Date(email.sentAt).toLocaleString()}</p>
            <p>{email.subject}</p>
            <div>
              <Link to={`/c/archived/${email._id}`}>Reply</Link>
              <button onClick={() => handleUnarchive(email._id)}>Unarchive</button>
              <button onClick={() => handleDelete(email._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Archived;
