const express = require('express');
const {
  serviceClient,
  corpClient,
  templateClient,
  euiClient,
  signTaskClient,
} = require('@fddnpm/fasc-openapi-node-sdk');

// 配置信息
const clientConfig = {
  // 认证信息
  credential: {
    appId: '80002452',
    appSecret: 'TUVXOYDVLMUXMJILUZLYMESYQO0KAOLU',
    accessToken: '',
  },
  // 服务请求地址
  serverUrl: 'https://uat-api.fadada.com/api/v5',
};

const checkToken = async () => {
  if (!clientConfig.credential.accessToken) {
    try {
      const sc = new serviceClient.Client(clientConfig);
      const res = await sc.getAccessToken();
      clientConfig.credential.accessToken = res.data.data.accessToken;
    } catch (ex) {
      res.status(500).json({
        message: 'failed to get access token',
        error: ex.message,
      });
    }
  }
  return true;
};

const app = express();
app.use(express.json());

// 添加生成随机字符串的函数
function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const maxLength = Math.min(length, 6); // 确保长度不超过6
  for (let i = 0; i < maxLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

app.post('/corp/get-auth-url', (req, res) => {
  return res.json({
    authUrl:
      'https://80002452.uat-e.fadada.com/authorizeui/corp/login?authSerial=d047bab52bd34ffeb21079d909f7cad3',
  });
});

// 创建获取模板列表的GET API, 参考templateClientAgent 定义，获取模板列表
app.get('/get-sign-template-list', async (req, res) => {
  try {
    // 检查请求中的token是否有效
    await checkToken(req);

    // 创建法大大SDK的客户端实例
    const templateClientAgent = new templateClient.Client(clientConfig);

    // 调用法大大SDK的获取模板列表接口
    const response = await templateClientAgent.getSignTemplateList({
      ownerId: {
        idType: 'corp',
        openId: 'e287b939b0f24099ba67c27bb2ddcd42',
      },
    });

    if (response.status === 200) {
      res.status(200).json({
        message: 'Template list retrieved successfully!',
        data: response.data,
      });
    } else {
      res.status(400).json({
        message: 'Failed to retrieve template list.',
        error: response.error || 'Unknown error',
      });
    }
  } catch (ex) {
    res.status(500).json({
      message: 'Internal server error',
      error: ex.message,
    });
  }
});

// 添加创建签约接口
app.post('/signature', async (req, res) => {
  try {
    // 检查请求中的token是否有效
    await checkToken();
    const signTaskClientAgent = new signTaskClient.Client(clientConfig);

    const response = await signTaskClientAgent.createWithTemplate({
      initiator: {
        idType: 'corp',
        openId: 'e287b939b0f24099ba67c27bb2ddcd42',
      },
      initiatorMemberId: '1879804313011265536',
      signTaskSubject: 'pc合同-node-' + (req.body?.subject || '') + '-' + generateRandomString(2),
      signDocType: 'contract',
      signTemplateId: '1741082402611146333', // PC 专业版合同
      autoStart: false, // fill some value first
      "freeSignType": "business",
      // 免验证签场景🐴
      businessId: '5986b781c9d0c68ac8956411d89abb15',
      actors: [
        {
          "signConfigInfo": {
            "requestVerifyFree": true
          },
          actor: {
            actorId: '甲方',
            actorType: 'corp',
            actorName: '德比软件（上海）有限公司',
            permissions: ['sign'],
            actorOpenId: 'e287b939b0f24099ba67c27bb2ddcd42',
            actorFDDId: '',
            actorEntityId: '',
            // TODO: test remove it
            // actorCorpMembers: [
            //   {
            //     memberId: '1879804313011265536',
            //   },
            // ],
          },
        }, {
          actor: {
            actorId: '乙方',
            actorType: 'corp',
            actorName: 'derbysoft',
            permissions: ['sign'],
            actorOpenId: '8aef63de75c7441e98a6adb5af15b4a2',
            actorFDDId: '',
            actorEntityId: '',
            // actorCorpMembers: [
            //   {
            //     memberId: '1889897475004211200', // giantfish@126.com
            //   },
            // ],
          },

        },
      ],
    });

    if (response.status === 200 && response.data.code === '100000') {
      const signTaskId = response.data.data.signTaskId;

      // fill some value first
      try {
        // 没有填写权限，所以需要使用 fillFieldValues 接口
        await signTaskClientAgent.fillFieldValues({
          signTaskId,
          docFieldValues: [
            {
              docId: '99125895',
              fieldId: 'amount',
              fieldValue: req.body?.amount || 'contract amount: $100,0000',
            },
            {
              docId: '99125895',
              fieldId: 'companyName',
              fieldValue: 'test company name',
            },
          ],
        });

        // start sign task
        await signTaskClientAgent.start({
          signTaskId,
        });

        res.status(200).json({
          message: 'Electronic signature initiated successfully!',
          data: response.data,
        });

      } catch (ex) {
        console.log(ex);
      }

    } else {
      res.status(400).json({
        message: 'Failed to initiate electronic signature.',
        error: response.data.msg,
      });
    }
  } catch (ex) {
    res.status(500).json({
      message: 'Internal server error',
      error: ex.message,
    });
  }
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
