const express = require('express');
const {
  serviceClient,
  corpClient,
  templateClient,
  euiClient,
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
    } catch (ex) {}
  }
  return true;
};

const app = express();
app.use(express.json());

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

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
