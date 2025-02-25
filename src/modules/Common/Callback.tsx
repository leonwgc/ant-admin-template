import React, { useEffect } from 'react';
import URI from 'urijs';

const Callback: React.FC = () => {
  // 授权成功 重定向到回调地址 ：
  const qs = URI().query(true);

  //   {
  //     "clientUserId": "15901634305",
  //     "signature": "ba68ba47f87e9dfd72f8ff9d18fda4801a83cf319cfc378d71772b5c873defd5",
  //     "authResult": "success",
  //     "clientCorpId": "test-company-5-id",
  //     "openCorpId": "8b4a207b1c1c4379b68295958e0219ff",
  //     "authScope": "ident_info,seal_info,organization,signtask_init,signtask_info,signtask_file,file_storage,template,contract_info,billaccount_info,smartform",
  //     "timestamp": "1740472696437"
  // }

  useEffect(() => {
    console.log(qs);
    window.parent.postMessage('authSuccess', '*');
  }, []);

  return <div>Callback Component</div>;
};

export default Callback;
