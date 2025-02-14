import React from 'react';
import IFrame from './IFrame';

export default () => {
  return (
    <div style={{ height: 'calc(100vh - 120px)' }}>
      <IFrame src="https://80002452.uat-e.fadada.com/authorizeui/corp/login?authSerial=7ee135f9cb8642d2bac1005421bf0d7b" />
    </div>
  );
};
