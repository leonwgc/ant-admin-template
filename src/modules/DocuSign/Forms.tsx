import { useLocalStorageState, useRequest } from 'ahooks';
import React, { useCallback } from 'react';
import { dsPost } from '~/utils/fetch';
import { Button, message } from 'antd';
import type { Token } from './Login';

export default () => {
  const [token] = useLocalStorageState<Token>('token', {
    listenStorageChange: true,
  });

  const createEnvelope = useCallback(() => {
    // https://apps-d.docusign.com/send/templates
    const templateId = '1e4a50c0-4ad7-42c0-84d3-808771ff61ba';

    const envelopeDefinition = {
      templateId: templateId,
      status: 'sent',
      sendEnvelope: false, //避免自动发送邮件
      uiConfig: {
        hideSuccessModal: true, // 尝试设置此参数来隐藏成功弹框
      },
    };

    // https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/create/
    return dsPost(
      `/v2.1/accounts/${token.accountId}/envelopes`,
      envelopeDefinition,
      {
        headers: { Authorization: `Bearer ${token?.token}` },
      }
    );
  }, [token?.token]);

  const { loading, data, error, run } = useRequest(createEnvelope, {
    manual: true,
    onSuccess(res) {
      message.success('Success:' + JSON.stringify(res.data));

      // {"envelopeId":"aaf2b275-12e7-4744-9feb-d7cf1757f7b5","uri":"/envelopes/aaf2b275-12e7-4744-9feb-d7cf1757f7b5","statusDateTime":"2025-02-11T10:06:21.2430000Z","status":"sent"}
    },
  });

  return (
    <div>
      <h1>DocuSign create and send envelope</h1>
      <p>
        <Button
          type="primary"
          onClick={run}
          loading={loading}
          disabled={loading}
        >
          Create envelope
        </Button>
      </p>
    </div>
  );
};
