import React, { useEffect } from 'react';
import URI from 'urijs';

// 印章授权成员事件
// 复制
// {
//     "sealIds" : [
//          "1740472696749153898"
//      ],
//     "eventTime" : "1740472696777" ,
//     "memberIds" : [
//          "1894305682594242560"
//      ],
//     "openCorpId" : "8b4a207b1c1c4379b68295958e0219ff" ,
//     "clientCorpId" : "test-company-5-id"
// }
const Callback: React.FC = () => {
  // 授权成功 重定向到回调地址 ：
  const qs = URI().query(true);

  //   request auth url
  //   {
  //     "clientCorpId": "test-company-5-id",
  //     "clientUserId": "15901634305",
  //     "accountName": "15901634305",
  //     "corpIdentInfo": {
  //         "corpName": "test-company-5",
  //         "corpIdentType": "corp",
  //         "corpIdentNo": "91310115MA1H98G37K",
  //         "legalRepName": "法大五"
  //     },
  //     "redirectUrl": "https://click.derbysoftsec.com/callback" 代理设置
  // }

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
    if (qs.authResult === 'success') {
      // TODO: callback api to save the auth info
      window.parent.postMessage('authSuccess', '*');
    }
  }, []);

  return <div>Callback Component</div>;
};

export default Callback;
