import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchProxyFadada } from '~/utils/fetch';

const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<
    { signTemplateName: string; signTemplateId: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetchProxyFadada.get('/get-sign-template-list');
        if (response.status === 200) {
          setTemplates(response.data.data.data.signTemplates);
        } else {
          setError('Failed to retrieve template list.');
        }
      } catch (ex) {
        setError('Internal server error');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Template List</h1>
      <Table
        dataSource={templates}
        columns={[
          {
            title: 'Template ID',
            dataIndex: 'signTemplateId',
            key: 'signTemplateId',
          },
          {
            title: 'Template Name',
            dataIndex: 'signTemplateName',
            key: 'signTemplateName',
          },
        ]}
        rowKey="signTemplateId"
      />
    </div>
  );
};

export default TemplateList;
