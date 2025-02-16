import { message } from 'antd';
import React, { useState } from 'react';
import { fetchProxyFadada } from '~/utils/fetch';

const Sign: React.FC = () => {
  const [templateId, setTemplateId] = useState('');
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');

  const handleSignContract = async () => {
    try {
      const response = await fetchProxyFadada.get('/signature');
      if (response.status === 200) {
        message.success('Contract signing initiated successfully!');
      }
    } catch (error) {
      console.error('Error during contract signing:', error);
      alert('An error occurred during contract signing. Please try again.');
    }
  };

  return (
    <div>
      <h2>Contract Signing</h2>
      <div>
        <label>
          Template ID:
          <input
            type="text"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Signer Name:
          <input
            type="text"
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Signer Email:
          <input
            type="email"
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSignContract}>Sign Contract</button>
    </div>
  );
};

export default Sign;
