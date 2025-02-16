import React, { useState } from 'react';

const ContractSigning: React.FC = () => {
  const [templateId, setTemplateId] = useState('');
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');

  const handleSignContract = async () => {
    try {
      const response = await fetch('https://api.example.com/sign-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: templateId,
          signer_name: signerName,
          signer_email: signerEmail,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Contract signing initiated:', data);
        alert('Contract signing initiated successfully!');
      } else {
        console.error('Failed to initiate contract signing');
        alert('Failed to initiate contract signing. Please try again.');
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

export default ContractSigning;