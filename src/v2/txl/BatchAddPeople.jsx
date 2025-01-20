//#region import & style

import React, { useState, useCallback } from 'react';
import { Radio, Progress, DatePicker, Spin } from 'antd';
import { getHostPrefix } from 'src/utils/host';
import {
  Space,
  styled,
  Icon,
  Button,
  FileInputTrigger,
  Switch,
  Tabs,
  useUpdateEffect,
} from 'react-uni-comps';
import { upload } from 'xhr-fetch-lib';
import OrgDialogSelect from '../common/OrgDialogSelect';
import { fetchAndDownload } from 'src/utils/fetch-blob';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import Dialog from 'src/common/Dialog';
import dayjs from 'dayjs';
import usePageTitle from 'src/hooks/usePageTitle';
import { showError } from 'src/common/msg';
import { get } from 'src/utils/req';
import { useUnmount } from 'ahooks';
import { dateTimeFormat } from 'src/utils/helper';

const StyledWrap = styled.div`
  width: 800px;
  margin: 0 auto;
  background: #fff;
  height: calc(100vh - 24px);
  position: relative;
  overflow-y: scroll;

  .ant-form-item {
    margin-bottom: 0;
  }

  .uc-tabs {
    margin: 16px auto;
    .uc-tabs-header-wrap {
      height: 56px;
      .uc-tabs-header-item {
        width: 64px;

        &:not(:first-child) {
          margin-left: 48px;
        }

        &.active {
          color: #005cff;
          border-bottom: 2px solid #005cff;

          font-weight: normal;
        }
      }
    }
  }

  .upload {
    height: 135px;
    background: #f5f7fa;
    padding: 24px;

    &.exporting {
      .export {
        display: flex;
        justify-content: space-between;
      }
    }

    .t {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;

      color: #1a1a1a;
    }

    .d {
      color: #8c8c8c;
      margin: 5px 0 10px;
    }

    .box {
      background: #ffffff;
      border: 1px dashed #e6e6e6;
      box-sizing: border-box;
      border-radius: 4px;
      height: 158px;
      margin-top: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 20px;

      .u {
      }
    }
  }

  .notify {
    margin-top: 38px;
    color: #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;

    .form {
      display: flex;
      align-items: center;

      .t {
        margin-right: 18px;
      }
    }
  }

  .footer {
    margin-top: 32px;
    text-align: right;

    .uc-btn {
      width: 80px;
    }
  }
`;

const StyledExcel = styled.div`
  position: relative;
  margin-top: 15px;
  width: 335px;
  height: 48px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  &.from {
    opacity: 0;
    transform: translate3d(0, -30%, 0);
  }
  &.to {
    opacity: 1;
    transform: none;
  }
  img {
    width: 32px;
    height: 32px;
    background: #2b9a4a;
    border-radius: 4px;
  }
  .desc {
    height: 32px;
    margin-left: 12px;
    .title {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #1a1a1a;
      line-height: 20px;
    }
    .kb {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #8c8c8c;
      line-height: 17px;
    }
  }
`;

const StyledDialog = styled(Dialog)`
  .body {
    margin: 0;
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 56px;
    height: 56px;
    background: rgba(0, 75, 204, 0.08);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }
`;

//#endregion

export default function BatchAddPeople({ history }) {
  usePageTitle('批量导入/修改');
  const [files, setFiles] = useState([]);
  const [tab, setTab] = useState(0);
  const [importing, setImporting] = useState(false);

  // notify
  const [checked, setChecked] = useState(false);
  const [notifyType, setNotifyType] = useState('0');
  const [notifyTime, setNotifyTime] = useState('');

  const getInitialResult = useCallback((percent = 0) => {
    return {
      over: false,
      errorNum: 0,
      successNum: 0,
      totalNum: 0,
      percent,
      batchNo: '',
    };
  }, []);

  // import result
  const [result, setResult] = useState(() => getInitialResult());

  const { errorNum = 0, successNum = 0, totalNum = 0, batchNo } = result;

  // org select
  const app = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();

  const { showBatchRessult = false, orgDialogSelectVisible = false, isExporting = false } = app;

  useUnmount(() =>
    updateStore({
      showBatchRessult: undefined,
      orgDialogSelectVisible: undefined,
      isExporting: undefined,
    })
  );

  useUpdateEffect(() => {
    setFiles([]);
    updateStore({ showBatchRessult: false });
  }, [tab]);

  const downloadErrorReport = () => {
    fetchAndDownload(
      `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/excel/export_error_data/createSimpleStaff/${batchNo}/4`,
      '失败名单.xlsx'
    );
  };

  return (
    <StyledWrap>
      <Tabs underline={false} value={tab} onChange={setTab} border={false}>
        <Tabs.Tab title="批量导入"></Tabs.Tab>
        <Tabs.Tab title="批量修改"></Tabs.Tab>
      </Tabs>

      {/* 批量导入 */}

      {tab === 0 ? (
        <div className="upload">
          <div className="t">1.下载导入模板</div>
          <div className="t d">根据提示信息完善表格内容</div>
          <div>
            <Button
              icon={<Icon type="icon-xiazai_line" />}
              onClick={() =>
                fetchAndDownload(
                  `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/download/downloadTemplate?type=21`,
                  '导入人员模板.xlsx'
                )
              }
            >
              下载模板
            </Button>
          </div>
        </div>
      ) : (
        <Spin spinning={isExporting}>
          <div className="upload">
            <div className="t">1.导出通讯录</div>
            <div className="t d">导出后，可在本地对员工信息批量修改，完成后在下方再次上传</div>
            <div>
              <Button
                onClick={() => updateStore({ orgDialogSelectVisible: true })}
                icon={<Icon type="icon-xiazai_line" />}
              >
                导出
              </Button>
            </div>
          </div>
        </Spin>
      )}

      <div className="upload" style={{ height: 243, margin: '16px 0 32px' }}>
        <div className="t">2.上传完善后的表格</div>
        <div className="box">
          <Space direction="vertical" size={10} style={{ alignItems: 'center' }}>
            <FileInputTrigger
              accept=".xls,.xlsx"
              onChange={(files) => {
                setFiles(files);
              }}
            >
              <Space>
                <Button icon={<Icon type="icon-shangchuan_line" style={{ fontSize: 16 }} />}>
                  {files.length > 0 ? '替换文件' : '上传文件'}
                </Button>
              </Space>
            </FileInputTrigger>

            <div className="d" style={{ margin: 0 }}>
              {files.length > 0 ? files[0].name : '下载模板并完善信息后，可在此处进行上传'}
            </div>

            {/* {showBatchRessult && (
              <div>
                共{totalNum}条数据 {tab === 0 ? '导入' : '更新'}成功{successNum}条 失败{errorNum}条{' '}
                {errorNum > 0 && (
                  <Button as="a" onClick={downloadErrorReport} style={{ marginLeft: 8 }}>
                    下载失败名单
                  </Button>
                )}
              </div>
            )} */}
          </Space>
        </div>
      </div>

      <div className="notify">
        <div className="form">
          <div className="t">短信通知员工</div>
          {checked && (
            <Space size={18}>
              <div>
                <Radio.Group
                  options={[
                    { label: '立即通知', value: '0' },
                    { label: '定时通知', value: '1' },
                  ]}
                  value={notifyType}
                  onChange={(e) => setNotifyType(e.target.value)}
                />

                {notifyType === '1' && (
                  <DatePicker
                    showTime
                    placeholder="请选择通知时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value={notifyTime}
                    onChange={(v) => {
                      setNotifyTime(v);
                    }}
                    disabledDate={(current) => {
                      const c = dayjs(current);
                      const n = dayjs();
                      return n > c.endOf('day');
                    }}
                  />
                )}
              </div>
            </Space>
          )}
        </div>

        <Switch checked={checked} onChange={setChecked} />
      </div>

      <div className="footer">
        <Space size={12}>
          <Button onClick={() => history.push('/qy/txl/people')}>取消</Button>
          <Button
            type="primary"
            disabled={files.length === 0}
            onClick={() => {
              let data = null;
              if (checked) {
                data = {
                  sendSms: true,
                };

                if (notifyType === '1') {
                  if (notifyTime) {
                    data.scheduledTimeSendSms = notifyTime.format(dateTimeFormat);
                  } else {
                    showError('请选择通知时间');
                    return;
                  }
                }
              }
              setImporting(true);
              const fakePercent = srcsrc(Math.random() * 20);
              setResult(getInitialResult(fakePercent));
              upload(
                `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/excel/import/direct/${
                  tab === 0 ? 'createSimpleStaff' : 'updateSimpleStaff'
                }`,
                data,
                files[0]
              ).then((xhr) => {
                const res = JSON.parse(xhr.responseText);
                if (res.code == '0') {
                  const batchNo = res.result;
                  // polling
                  let n = 0;
                  const retry = () => {
                    if (n < 100) {
                      n++;
                      setTimeout(polling, 500);
                    }
                  };
                  const polling = () =>
                    get(`/api/website/v1/excel/report/createSimpleStaff/${batchNo}`)
                      .then((res) => {
                        const {
                          errorNum = 0,
                          successNum = 0,
                          totalNum = 0,
                          batchNo,
                          over = false,
                        } = res.result;
                        if (!over) {
                          const p = Math.max(
                            fakePercent,
                            srcsrc(((successNum + errorNum) * 100) / totalNum)
                          );
                          setResult({
                            errorNum,
                            successNum,
                            totalNum,
                            batchNo,
                            percent: p,
                          });
                          retry();
                        } else {
                          setResult({
                            errorNum,
                            successNum,
                            totalNum,
                            batchNo,
                            percent: 100,
                          });
                          setImporting(false);
                          updateStore({ showBatchRessult: true });
                        }
                      })
                      .catch(retry);

                  polling();
                } else {
                  showError(res);
                }
              });
            }}
          >
            导入
          </Button>
        </Space>
      </div>

      <StyledDialog
        closable={false}
        visible={importing}
        style={{ width: 600, height: 120, padding: '32px', top: 120 }}
      >
        <div className="avatar">
          <Icon type="icon-daoruyuangong" style={{ fontSize: 24, color: '#004bcc' }} />
        </div>

        <div style={{ width: 420 }}>
          <div>导入中</div>
          <Progress percent={result.percent} strokeColor="#004bcc" strokeWidth={4} />
        </div>
      </StyledDialog>

      <Dialog
        visible={showBatchRessult}
        onClose={() => updateStore({ showBatchRessult: false })}
        title={`${tab === 0 ? '导入' : '修改'}结果`}
        style={{ width: 420, minHeight: 160 }}
        footer={
          errorNum == 0 && (
            <Button
              type="primary"
              onClick={() => {
                history.push('/qy/txl/people');
              }}
            >
              确定
            </Button>
          )
        }
      >
        共{totalNum}条数据 {tab === 0 ? '导入' : '更新'}成功{successNum}条 失败{errorNum}条{' '}
        {errorNum > 0 && (
          <Button as="a" onClick={downloadErrorReport} style={{ marginLeft: 8 }}>
            下载失败名单
          </Button>
        )}
      </Dialog>

      <OrgDialogSelect
        multiple
        visible={orgDialogSelectVisible}
        onClose={() => updateStore({ orgDialogSelectVisible: false })}
        title="选择部门"
        onConfirm={(values) => {
          updateStore({ orgDialogSelectVisible: false, isExporting: true });

          fetchAndDownload(
            `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/export/simple/staff`,
            '员工导出.xlsx',
            'post',
            { departmentIdSet: values }
          ).then(() => updateStore({ isExporting: false }));
        }}
      />
    </StyledWrap>
  );
}
