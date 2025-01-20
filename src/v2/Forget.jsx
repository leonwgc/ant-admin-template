//#region  style & libs

import React, { useState, useEffect, useRef } from 'react';
import {
  styled,
  useCountdown,
  Toast,
  loadResource,
  Input,
  Space,
  Button,
  AutoCenter,
  IconArrow,
} from 'react-uni-comps';
import { useLocation } from 'react-router-dom';
import { isValidPhone, isValidEmail } from 'src/utils/helper';
import { getEnv } from 'src/utils/host';
import usePageTitle from 'src/hooks/usePageTitle';
import showSuperCode from 'src/utils/superCode';
import { get, post } from 'src/utils/req';
import * as qs from 'qs';
import { showError, showSuccess } from 'src/common/msg';

const StyledWrap = styled.div`
  background: #fff;
  height: 100vh;
  display: flex;

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .box {
      width: 499px;
      height: 429px;
      padding: 36px 42px 39px;
      background: #ffffff;
      border: 0.5px solid #eaeaea;
      box-sizing: border-box;
      box-shadow: 0px 11px 15px 1px rgba(0, 0, 0, 0.04);
      border-radius: 8px;
      position: relative;
      display: flex;
      flex-direction: column;

      .t {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #8c8c8c;
        cursor: pointer;
      }
      .foot {
      }
      .form-wrap {
        flex: 1;
        margin-top: 32px;
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

  .left-section {
    flex: 0 0 416px;
    background: #0d72ff;
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

const checkPwd = (pwd = '') => {
  if (pwd.length < 8) {
    return '密码长度不正确，请重新设置';
  }

  if (pwd.match(/^\d+$/) || pwd.match(/^[a-z]+$/i) || pwd.match(/^(\w{1})\1*$/)) {
    return '密码太弱，有被盗风险，请设置由多种字符组成的复杂密码';
  }

  return '';
};

export default function Forget({ history }) {
  usePageTitle('找回密码');
  const [data, setData] = useState({ account: '', code: '', pwd: '', pwd1: '' });
  const { countdown, isRunning, start, isReStarted } = useCountdown(60);
  const [step, setStep] = useState(0);
  const [type, setType] = useState('');

  const headerRef = useRef({});

  const ref = useRef(null);

  const btnRef = useRef();

  const loc = useLocation();

  let searchParams;
  let isFromEmailReset = false;

  if (loc.search) {
    searchParams = qs.parse(loc.search.slice(1));

    if (searchParams.verifyCode && searchParams.email && isValidEmail(searchParams.email)) {
      isFromEmailReset = true;
    }
  }

  useEffect(() => {
    loadResource('https://static.zuifuli.com/libs/jsencrypt.min.js').then(() => {
      if (!window.JSEncrypt) return;
      encrypt = new window.JSEncrypt();
      encrypt.setKey(key);
    });
  }, []);

  const show = () => {
    const { account = '' } = data;

    if (isValidPhone(account)) {
      showSuperCode(
        (headers) => {
          start();
          headerRef.current = headers;
          get(`/api/customer/v2/verify/code/send/${account}`, null, {
            ...headers,
            's-phone': account,
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

  const { code, pwd, pwd1, account } = data;

  const onFieldChange = (name) => (value) => {
    setData({ ...data, [name]: value });
  };

  const isFormValid = () => {
    if (step === 0) {
      return isValidEmail(account) || isValidPhone(account);
    } else if (step === 1) {
      if (type === 'phone') {
        return code;
      } else if (type === 'email') {
        return isValidEmail(account);
      }
    } else if (step === 2) {
      // phone
      if (type === 'phone') {
        return pwd && pwd === pwd1;
      } else {
        return true;
      }
    }
  };

  let btnText = step < 2 ? '下一步' : '确认';

  if (type === 'email') {
    if (step === 1) {
      btnText = '重置密码';
    } else if (step === 2) {
      btnText = '返回登录';
    }
  }

  const hideNav = step === 2 && type === 'email';

  return (
    <StyledWrap>
      <div className="left-section">
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

          {!isFromEmailReset && (
            <div className="box">
              {!hideNav && (
                <div className="t">
                  <Space
                    onClick={() => {
                      if (step === 0) {
                        history.push('/login');
                      } else {
                        setStep(step - 1);
                      }
                    }}
                    size={2}
                  >
                    <IconArrow direction="left" /> {step === 0 ? '返回登录' : '返回'}
                  </Space>
                </div>
              )}
              <div className="form-wrap">
                {step === 0 && (
                  <div>
                    <div style={{ marginBottom: 24 }}>请输入需找回登录密码的账号</div>
                    <Input
                      clearable
                      placeholder="请输入登录账号"
                      value={account}
                      onChange={onFieldChange('account')}
                    />
                  </div>
                )}
                {step === 1 && type === 'phone' && (
                  <Space className="phone" direction="vertical" size={24}>
                    <div>找回密码</div>
                    <Input readOnly maxLength={11} value={account} />

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
                        disabled={!isValidPhone(account)}
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

                {/* email */}
                {step === 1 && type === 'email' && (
                  <Space className="phone" direction="vertical" size={24}>
                    <div>找回密码</div>
                    <Input readOnly maxLength={11} value={account} />
                  </Space>
                )}

                {step === 2 && type === 'phone' && (
                  <Space className="phone" direction="vertical" size={24}>
                    <Input
                      type="password"
                      clearable
                      placeholder="请输入新密码"
                      maxLength={20}
                      value={pwd}
                      onChange={onFieldChange('pwd')}
                    />
                    <Input
                      clearable
                      type="password"
                      placeholder="请再次输入新密码"
                      maxLength={20}
                      value={pwd1}
                      onChange={onFieldChange('pwd1')}
                    />
                  </Space>
                )}

                {step === 2 && type === 'email' && (
                  <div style={{ fontSize: 18, lineHeight: '32px' }}>
                    已发送重置链接至“{account}”电子邮箱，请通过邮箱链接完成该账号的密码重置
                  </div>
                )}
              </div>
              <div className="foot">
                <Button
                  type="primary"
                  style={{ height: 50, borderRadius: 4 }}
                  block
                  ref={btnRef}
                  disabled={!isFormValid()}
                  onClick={() => {
                    if (step === 0) {
                      setStep(1);
                      if (isValidPhone(account)) {
                        setType('phone');
                      } else {
                        setType('email');
                      }
                    }
                    if (step === 1 && type === 'phone') {
                      post(`/api/customer/v2/verify/code/check/verifyCode`, {
                        phone: account,
                        verifyCode: code,
                      }).then(() => {
                        setStep(2);
                      });
                    }

                    if (step === 1 && type === 'email') {
                      // setStep(2);
                      // email verify
                      post(`/api/website/v2/account/loginName/verifycode`, {
                        loginName: account,
                      }).then(() => {
                        setStep(2);
                      });
                    }

                    if (step === 2 && type === 'phone') {
                      // pwd
                      if (pwd === pwd1) {
                        const error = checkPwd(pwd);
                        if (error) {
                          showError(error);
                        } else {
                          post(`/api/customer/v1/account/changePassword`, {
                            phone: account,
                            verifyCode: code,
                            newPasswd: pwd,
                          }).then(() => {
                            showSuccess('修改成功');
                            setTimeout(() => {
                              history.push('/login');
                            }, 1000);
                          });
                        }
                      } else {
                        showError('两次密码不一致');
                      }
                    }

                    if (step === 2 && type === 'email') {
                      history.push('/login');
                    }
                  }}
                >
                  {btnText}
                </Button>
              </div>
            </div>
          )}

          {/* email reset  */}
          {isFromEmailReset && (
            <div className="box">
              {!hideNav && (
                <div className="t">
                  <Space
                    onClick={() => {
                      history.push('/login');
                    }}
                    size={2}
                  >
                    <IconArrow direction="left" />
                    返回登录
                  </Space>
                </div>
              )}
              <div className="form-wrap">
                <Space className="phone" direction="vertical" size={24}>
                  <Input
                    type="password"
                    clearable
                    placeholder="请输入新密码"
                    maxLength={20}
                    value={pwd}
                    onChange={onFieldChange('pwd')}
                  />
                  <Input
                    clearable
                    type="password"
                    placeholder="请再次输入新密码"
                    maxLength={20}
                    value={pwd1}
                    onChange={onFieldChange('pwd1')}
                  />
                </Space>
              </div>
              <div className="foot">
                <Button
                  type="primary"
                  style={{ height: 50, borderRadius: 4 }}
                  block
                  onClick={() => {
                    if (pwd === pwd1) {
                      const error = checkPwd(pwd);
                      if (error) {
                        showError(error);
                      } else {
                        post(`/api/website/v1/orgAccount/changeOrgPassword`, {
                          email: searchParams.email,
                          verifyCode: searchParams.verifyCode,
                          newPasswd: pwd,
                        }).then(() => {
                          showSuccess('修改成功');
                          setTimeout(() => {
                            history.push('/login');
                          }, 1000);
                        });
                      }
                    } else {
                      showError('两次密码不一致');
                    }
                  }}
                >
                  提交
                </Button>
              </div>
            </div>
          )}
          <div>&nbsp;</div>
        </Space>
      </div>
    </StyledWrap>
  );
}
