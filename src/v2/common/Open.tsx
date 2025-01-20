// 'work-j': 兼容简简 ,CustChannel=== 'work-j' ,通过SubChannel判断平台,

// 'work-w2': 企业微信
// 'work-d2': 钉钉
// 'work-f2': 飞书
import React, { useEffect, useRef, useState } from 'react';
import { useMount, useForceUpdate, loadResource } from 'react-uni-comps';
import { showError } from 'src/common/msg';
import { get } from 'src/utils/req';

type CustChannel = 'work-j' | 'work-w2' | 'work-d2' | 'work-f2';

export type SubChannel = 'wechat' | 'dingtalk' | 'feishu' | 'web';

declare global {
  interface Window {
    DTOpenData: any;
    WWOpenData: any;
    wx: any;
  }
}

// cache env
let env: SubChannel;

/**
 *  set current host environment
 *
 * @param {CustChannel} custChannel
 * @param {*} subChannel
 * @return {void}
 */
const setEnv = (custChannel: CustChannel, subChannel) => {
  if (env) {
    return env;
  }

  let p: SubChannel = 'web';

  switch (custChannel) {
    case 'work-d2':
      p = 'dingtalk';
      break;
    case 'work-f2':
      p = 'feishu';
      break;
    case 'work-w2':
      p = 'wechat';
      break;
    case 'work-j':
      p = subChannel || 'web';
  }

  env = p;
};
/**
 *  get open env
 *
 * @return {*}
 */
export const getOpenEnv: () => SubChannel = () => {
  return env;
};

type OrgInfo = {
  custChannel?: CustChannel;
  subChannel?: string;
};

type UserInfo = {
  corpId: string;
};

/**
 *  获取用户部门信息，并初始多平台open-data
 *
 * @return {*}
 */
export const init = (): Promise<{ orgInfo: OrgInfo; userInfo: UserInfo }> => {
  return Promise.all([
    get(`/api/customer/v3/org/info`),
    get(`/api/agent/v1/customer/queryCustByCustId4OneSys`),
  ]).then(([orgRes, userRes]: any) => {
    const orgInfo = orgRes.result || {};
    const userInfo = userRes.result || {};

    setEnv(userInfo.custChannel, userInfo.subChannel);

    initOpenEnv(orgInfo.corpId);

    return { orgInfo, userInfo };
  });
};

let isEnvReady = false;
/**
 * opendata环境准备
 *
 */
const initOpenEnv = (corpId: string) => {
  switch (env) {
    case 'dingtalk': {
      //钉钉统一登录
      const href = encodeURIComponent(location.href); //1
      let authUrl = `http://auth.dingtalk.com/login?redirectUri=${href}`; //2
      let url = `https://login.dingtalk.com/oauth2/auth?response_type=code&client_id=dingwa4tibze6jwz7mgv&scope=openid&state=dddd&redirect_uri=${encodeURIComponent(
        authUrl
      )}`;
      if (!corpId) {
        location.href = url;
      } else {
        if (typeof window.DTOpenData !== 'undefined') {
          if (window.DTOpenData.init(corpId)) {
            console.log('dingtalk:open data init success');
            isEnvReady = true;
          } else {
            console.log('dingtalk:open data init failed');
            location.href = url;
          }
        } else {
          loadResource('//auth.dingtalk.com/opendata-1.1.0.js', {})
            .then(() => {
              if (window.DTOpenData.init(corpId)) {
                console.log('dingtalk:open data init success');
                isEnvReady = true;
              } else {
                console.log('dingtalk:open data init failed');
                location.href = url;
              }
            })
            .catch(() => showError('dingtalk:opendata sdk拉取失败'));
        }
      }

      break;
    }
    case 'wechat': {
      console.log('wechat env');
      Promise.all([
        loadResource(`//res.wx.qq.com/open/js/jweixin-1.2.0.js`, { referrerpolicy: 'origin' }),
        loadResource(`//open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js`, {
          referrerpolicy: 'origin',
        }),
      ]).then(() => {
        let t = 0;
        const agentConfig = () => {
          if (!window.wx || !window.wx.agentConfig) {
            setTimeout(() => {
              t++;
              if (t % 20 == 0) {
                location.reload();
              } else {
                console.log('try:' + t);
                agentConfig();
              }
            }, 200);
            return;
          }

          console.log(
            `/api/wechat/v1/aggregate/auth?url=${location.href.split('#')[0]}&agent=true`
          );

          get(`/api/wechat/v1/aggregate/auth`, {
            url: location.href.split('#')[0],
            agent: true,
          }).then(({ result = {} }: any) => {
            // console.log(JSON.stringify(result));
            window.wx.agentConfig({
              corpid: result.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
              agentid: result.agentId, // 必填，企业微信的应用id （e.g. 1000247）
              timestamp: result.timeStamp, // 必填，生成签名的时间戳
              nonceStr: result.nonceStr, // 必填，生成签名的随机串
              signature: result.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
              jsApiList: ['selectExternalContact'], //必填，传入需要使用的接口名称
              success: (res) => {
                // 回调
                isEnvReady = true;
                console.log('agentConfig ok');
                console.log(res);
              },
              fail: (res) => {
                console.log('agentConfig failed', JSON.stringify(res));
              },
            });
          });
        };

        agentConfig();
      });
    }
    default: {
      isEnvReady = true;
      console.log('web env');
    }
  }
};

const regex = /(jian_dt_u_|jian_dt_d_|zfl_u_|zfl_d_)/i;

type OpenType = 'userName' | 'deptName'; // based on dingtalk

type Props = {
  openType: OpenType;
  openId: string;
};

/**
 * 姓名，部门渲染
 *
 * @param {*} { openType, openId }
 * @return {*}
 */
export const OpenData: React.FC<Props> = ({ openType, openId }) => {
  const ref = useRef();
  const envRef = useRef<{
    isEnvReady: boolean;
    env: SubChannel;
  }>({
    isEnvReady: isEnvReady,
    env: env,
  });

  const [isReady, setIsReady] = useState(isEnvReady);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const el = ref.current;
    if (el && isReady && envRef.current.env && openId) {
      switch (envRef.current.env) {
        case 'dingtalk': {
          // window.DTOpenData?.update?.([el]);
          window.DTOpenData?.update?.(document.querySelectorAll('dt-open-data'));
          break;
        }
        case 'wechat': {
          window.WWOpenData?.bind?.(el);
          break;
        }
        default:
          break;
      }
    }
  }, [openId, envRef.current, ref.current, isReady]);

  useMount(() => {
    if (!envRef.current.isEnvReady) {
      let t = setInterval(() => {
        if (isEnvReady) {
          envRef.current.env = env;
          envRef.current.isEnvReady = true;
          setIsReady(true);
          clearInterval(t);
        }
      }, 100);
    } else {
      setIsReady(true);
    }
  });

  if (!openType || !openId || !envRef.current.isEnvReady) {
    return <span ref={ref} data-role={openId}></span>;
  }

  let id = openId;
  if (regex.test(id)) {
    id = id.replace(regex, '');
  } else {
    return openId;
  }

  // todo: 飞书
  switch (env) {
    case 'dingtalk': {
      return (
        <span data-role={`open-data-${envRef.current.env}`}>
          <dt-open-data open-type={openType} open-id={id} ref={ref} />
        </span>
      );
    }
    case 'wechat': {
      const t = openType === 'deptName' ? 'departmentName' : openType;
      return (
        <span data-role={`open-data-${envRef.current.env}`}>
          <ww-open-data ref={ref} type={t} openid={id} />
        </span>
      );
    }
    default: {
      return (
        <span data-role={`open-data-${envRef.current.env}`} ref={ref}>
          {openId}
        </span>
      );
    }
  }
};
