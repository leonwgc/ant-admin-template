//#region  style & libs

import React, { useState, useEffect, useRef } from 'react';
import {
  styled,
  useCountdown,
  Toast,
  loadResource,
  Input,
  Space,
  Tabs,
  Button,
  Icon,
  clsx,
  AutoCenter,
  getThemeColorCss,
  useMount,
} from 'react-uni-comps';
import { isValidPhone, getURLParams } from 'src/utils/helper';
import { getHostPrefix, getEnv } from 'src/utils/host';
import usePageTitle from 'src/hooks/usePageTitle';
import showSuperCode from 'src/utils/superCode';
import { get, post, default as req } from 'src/utils/req';

const StyledWrap = styled.div`
  background: #fff;
  height: 100vh;
  display: flex;

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .qr-wrap {
      margin: 0 auto;
      width: 220px;

      .qr-title {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 34px;
        color: #1a1a1a;
        text-align: center;
      }

      .desc {
        margin: 8px 0 20px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        display: flex;
        align-items: center;
        color: #bfbfbf;
      }
    }

    .forget {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      padding: 0;
    }

    .box {
      width: 499px;
      height: 429px;
      padding: 36px 45px 76px;
      background: #ffffff;
      border: 0.5px solid #eaeaea;
      box-sizing: border-box;
      box-shadow: 0px 11px 15px 1px rgba(0, 0, 0, 0.04);
      border-radius: 8px;
      position: relative;

      .qr-switch {
        position: absolute;
        top: 41px;
        right: 47px;
        font-size: 34px;
        cursor: pointer;
      }

      .tab-wrap {
        width: 409px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;

        &.qrcode {
          margin-bottom: 0;
          margin-top: 6px;
        }

        .uc-tabs {
          font-family: PingFang SC;
          height: 44px;
          font-size: 18px;
          line-height: 25px;
          .uc-tabs-header-wrap {
            .uc-tabs-header-item {
              margin-right: 40px;
              color: #8c8c8c;
              border-bottom: 4px solid transparent;

              &.active {
                color: #1a1a1a;
                border-bottom-color: #1a1a1a;
              }
            }
          }
        }
      }

      .form-wrap {
        .uc-input {
          width: 409px;
          height: 48px;
          background: #f9faff;
          border: 1px solid #eaf0f8;
          box-sizing: border-box;
          border-radius: 5px;
        }
        .uc-btn {
          border-radius: 4px;
          height: 50px;
          font-weight: 500;
          font-size: 18px;
          line-height: 21px;
          margin-top: 80px;

          &.anchor {
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            padding: 0;
            margin-top: 12px;
            text-align: right;
            height: unset;
          }
        }
      }
    }
  }

  .left {
    flex: 0 0 416px;

    ${getThemeColorCss('background')}
    padding-top: 296px;

    .item {
      text-align: center;
      .text {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 21px;
        color: #ffffff;
      }
      img {
        width: 360px;
        height: 282px;
        margin-top: 66px;
      }
    }
  }
`;

//#endregion style & libs

let encrypt = null;

const env = getEnv();
let key = '';

if (env === 'prd') {
  key =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNUdKQB+OqzOMSbmThSqr8fbEdyCcoqT89nwKKedTKzf02Wbj5AX3yoThI6n4mQ/q8jNhRop7fQDeL5ARKL/XG/TBCtCp/ihhG6MZHExbvYAsKg5wSuB4ydTorsEFcSr9uugd3ZKGTnUAGtzkEEjB+eXOyPN9Oo8MLXRn1JzYwHwIDAQAB';
} else if (env === 'pre') {
  key =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwnmh8tlbWoGjtmF3/v9okOPSVhP9DBSX2B4BE0M3KF3p8E7z4iJUoTWdcEJvW1TbnqHYXiI0udLTLFtcXNvBBMcZdx4syjESmJYZPmJ5EQegBdKnARlciuS1W3vwb9cX2NP5DhpbtOsagL+KA7IHr/cFm6pU+7vHWlp2e0pS3SwIDAQAB';
} else {
  key =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyXlpoPKJY9LRqSSbnz5a9sCyZxztvKwik+60/yqlspjb1Uz8QVRn/wPXNTH31LL1p6gVEqdwu40aA8mlAuX1jJ1t6nFWgUHGH6YQ7ajm3U7s4mbjVPhaT0uY9b4GGxnQ1qxl1OnlwnSwDNKE686h/DQ/IJEehLeivAIAGmPrESQIDAQAB';
}

const tabs = ['account', 'phone'];

export default function Login({ history }) {
  usePageTitle('登录');
  const [data, setData] = useState({ tel: '', code: '', loginName: '', pwd: '' });
  const [useQrcode, setUseQrcode] = useState(false);
  const { countdown, isRunning, start, isReStarted } = useCountdown(60);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [eyeOn, setEyeOn] = useState(false);

  const headerRef = useRef({});

  const ref = useRef(null);
  const qrRef = useRef();
  const qrDomRef = useRef();
  const btnRef = useRef();

  const qrcodeKeyRef = useRef('');
  const qrcodeTimerRef = useRef(0);

  const search = location.search;
  let query = {};
  if (search) {
    query = getURLParams();
  }

  const [tab, setTab] = useState(() => {
    if (query.tab) {
      let index = tabs.findIndex((t) => t === query.tab);

      if (index === -1) {
        index = 0;
      }

      return index;
    }
    return 0;
  });

  const redirectFunc = () => {
    if (query.redirectUrl) {
      location.href = query.redirectUrl;
    } else {
      location.href = `/index`;
    }
  };

  // auto login
  useMount(() => {
    get('/api/customer/v1/loginAuth/getLoginName', null, null, false, false)
      .then((res) => {
        // TODO: multiple login names
        redirectFunc();
      })
      .catch(() => console.log('not login'));
  });

  useEffect(() => {
    loadResource('https://static.zuifuli.com/libs/jsencrypt.min.js').then(() => {
      if (!window.JSEncrypt) return;
      encrypt = new window.JSEncrypt();
      encrypt.setKey(key);
    });
  }, []);

  useEffect(() => {
    if (useQrcode) {
      const init = () => {
        if (window.QRCode && qrDomRef.current) {
          qrRef.current = new window.QRCode(qrDomRef.current, {
            text: '',
            colorDark: '#000000',
            colorLight: '#ffffff',
            width: 220,
            height: 220,
          });

          get('/api/customer/v1/loginAuth/getLoginKey').then((res) => {
            qrcodeKeyRef.current = res.result || '';

            qrRef.current.makeCode(
              `https://${getHostPrefix()}h5.zuifuli.com/sword/auth?key=${qrcodeKeyRef.current}`
            );

            qrcodeTimerRef.current = setInterval(() => {
              get(`/api/customer/v2/login/getLoginNameAuth?loginKey=${qrcodeKeyRef.current}`).then(
                (res) => {
                  if (!res.message) {
                    clearInterval(qrcodeTimerRef.current);
                    redirectFunc();
                  }
                }
              );
            }, 3000);
          });
        }
      };
      loadResource('https://static.zuifuli.com/libs/qrcode.min.js').then(init);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useQrcode]);

  const show = () => {
    const { tel = '' } = data;

    if (isValidPhone(tel)) {
      showSuperCode(
        (headers) => {
          start();
          headerRef.current = headers;
          get(`/api/customer/v2/verify/code/send4Channel/${tel}`, null, {
            ...headers,
            's-phone': tel,
          }).then((res) => {
            if (res.code != '0') {
              Toast.show(res.message || '错误');
              stop();
            }
          });
        },
        {
          getButtonNode() {
            return ref.current;
          },
          placement: 'left',
        }
      );
    } else {
      Toast.show('请输入正确的手机号码');
    }
  };

  const { tel, code, loginName, pwd } = data;

  const onFieldChange = (name) => (value) => {
    setData({ ...data, [name]: value });
  };

  const submit = () => {
    setIsSubmiting(true);
    const { tel, code, loginName, pwd } = data;
    const header = headerRef.current;
    if (tab === 1) {
      if (!isValidPhone(tel)) {
        Toast.show('请输入正确的手机号码');
        return;
      }
      if (!code) {
        Toast.show('验证码不能为空');
        return;
      }
    } else {
      if (!loginName) {
        Toast.show('请输入用户名');
        return;
      }
      if (!pwd) {
        Toast.show('请输入密码');
        return;
      }
    }

    let postData = {
      source: 'P',
    };

    // const encryptPasswd = encrypt.encrypt(pwd);

    if (tab === 1) {
      postData = { ...postData, phone: tel, verifyCode: code };
    } else {
      postData = { ...postData, loginName, encryptPasswd: encrypt.encrypt(pwd) };
    }

    post(
      tab === 1 ? `/api/user/v1/account/loginByVerifyCode` : '/api/user/v3/loginPage/loginV3',
      postData,
      header
    )
      .then(() => {
        setIsSubmiting(false);
        redirectFunc();
      })
      .catch((ex) => {
        setIsSubmiting(false);
        if (ex.message) {
          if (ex.code == '132034') {
            // only name login catch this error
            location.href = `https://${getHostPrefix()}h5.zuifuli.com/web/common/virtual-account.html?user=${loginName}&pwd=${encodeURIComponent(
              encrypt.encrypt(pwd)
            )}`;
          }
        }
      });
  };

  const isFormValid = () => {
    if (tab === 0) {
      return loginName && pwd;
    } else if (tab === 1) {
      return isValidPhone(tel) && code;
    }
  };

  return (
    <StyledWrap>
      <div className="left">
        <AutoCenter>
          <div className="item">
            <div className="text">·用科技打造有温度的职场·</div>
            <img src="https://static.zuifuli.com/images/icare-company/login.png" />
          </div>
        </AutoCenter>
      </div>
      <div className="right">
        <Space direction="vertical" size={32}>
          <div className="logo">
            <img
              src="https://static.zuifuli.com/images/icare-company/logo-text.png"
              width={186}
              height={37}
            />
          </div>
          <div className="box">
            <div className={clsx('tab-wrap', { qrcode: useQrcode })}>
              {!useQrcode ? (
                <Tabs underline={false} value={tab} onChange={setTab} border={false}>
                  <Tabs.Tab title="密码登录"></Tabs.Tab>
                  <Tabs.Tab title="短信登录"></Tabs.Tab>
                </Tabs>
              ) : null}

              <Icon
                className="qr-switch"
                type={useQrcode ? 'icon-zhanghaomima' : 'icon-saoma'}
                onClick={() => setUseQrcode((p) => !p)}
                style={{ fontSize: 30 }}
              />
            </div>

            {!useQrcode ? (
              <div className="form-wrap">
                {tab === 0 ? (
                  <Space className="account" direction="vertical" size={24}>
                    <Input
                      type="text"
                      placeholder="请输入账号"
                      value={loginName}
                      onChange={onFieldChange('loginName')}
                    />

                    <Input
                      type={eyeOn ? 'text' : 'password'}
                      placeholder="请输入密码"
                      value={pwd}
                      onChange={onFieldChange('pwd')}
                      suffix={
                        <Icon
                          style={{ marginLeft: 8 }}
                          onClick={() => setEyeOn((v) => !v)}
                          type={eyeOn ? 'icon-xianshi' : 'icon-yincang'}
                        />
                      }
                    />
                  </Space>
                ) : (
                  <Space className="phone" direction="vertical" size={24}>
                    <Input
                      clearable
                      placeholder="请输入手机号"
                      maxLength={11}
                      value={tel}
                      onChange={onFieldChange('tel')}
                    />

                    <Space size={16}>
                      <Input
                        clearable
                        placeholder="请输入短信验证码"
                        value={code}
                        onChange={onFieldChange('code')}
                        style={{ width: 313 }}
                        maxLength={6}
                      />
                      <Button
                        as="a"
                        style={{ margin: 0 }}
                        disabled={!isValidPhone(tel)}
                        ref={ref}
                        onClick={isRunning ? null : show}
                      >
                        {isRunning
                          ? countdown + '秒'
                          : `${isReStarted ? '重新获取' : '发送验证码'}`}
                      </Button>
                    </Space>
                  </Space>
                )}
                <Button
                  type="primary"
                  loading={isSubmiting}
                  block
                  ref={btnRef}
                  disabled={!isFormValid()}
                  onClick={() => {
                    if (tab === 0) {
                      // account
                      showSuperCode(
                        (headers) => {
                          headerRef.current = headers;
                          submit();
                        },
                        {
                          getButtonNode() {
                            return btnRef.current;
                          },
                          placement: 'left',
                        }
                      );
                    } else {
                      submit();
                    }
                  }}
                >
                  登录
                </Button>
              </div>
            ) : (
              <div className="qr-wrap">
                <div className="qr-title">扫码登录</div>
                <div className="desc">请用最福利App扫描二维码</div>
                <div ref={qrDomRef} style={{ width: 220, height: 220 }}></div>
              </div>
            )}
          </div>
          <div className="forget">
            <Button as="a" onClick={() => history.push('/forget')}>
              忘记密码？点我找回
            </Button>
          </div>
        </Space>
      </div>
    </StyledWrap>
  );
}
