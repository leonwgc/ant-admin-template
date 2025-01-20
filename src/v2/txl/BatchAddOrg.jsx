//#region import & style

import React, { useEffect, useState, useCallback } from 'react';
import { Radio, Progress, DatePicker } from 'antd';
import { getHostPrefix } from 'src/utils/host';
import { Space, styled, Icon, Button, FileInputTrigger, useUnmount } from 'react-uni-comps';
import { upload } from 'xhr-fetch-lib';
import { fetchAndDownload } from 'src/utils/fetch-blob';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import Dialog from 'src/common/Dialog';
import dayjs from 'dayjs';
import usePageTitle from 'src/hooks/usePageTitle';
import { showError } from 'src/common/msg';
import { get, post } from 'src/utils/req';

const StyledWrap = styled.div`
  width: 800px;
  margin: 24px auto 0;
  background: #fff;
  height: calc(100vh - 24px);
  position: relative;
  overflow-y: scroll;

  .ant-form-item {
    margin-bottom: 0;
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

export default function BatchAddOrg({ history }) {
  usePageTitle('批量导入/修改');
  const [files, setFiles] = useState([]);
  const [myLoading, setMyLoading] = useState(false);

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

  const app = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();
  const { showBatchRessult = false, importing } = app;

  useUnmount(() =>
    updateStore({
      showBatchRessult: undefined,
      importing: undefined,
    })
  );

  const downloadErrorReport = () => {
    fetchAndDownload(
      `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/excel/export/all/error/department/${batchNo}`,
      '失败名单.xlsx'
    );
  };

  return (
    <StyledWrap>
      <div>
        <div className="upload">
          <div className="t">1.下载导入模板</div>
          <div className="t d">根据提示信息完善表格内容</div>
          <div>
            <Button
              icon={<Icon type="icon-xiazai_line" />}
              onClick={() =>
                fetchAndDownload(
                  `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/download/downloadTemplate?type=20`,
                  '部门导入模板.xlsx'
                )
              }
            >
              下载模板
            </Button>
          </div>
        </div>

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

              {showBatchRessult && (
                <div>
                  共{totalNum}条数据 导入成功{successNum}条 失败{errorNum}条{' '}
                  {errorNum > 0 && (
                    <Button as="a" onClick={downloadErrorReport} style={{ marginLeft: 8 }}>
                      下载失败名单
                    </Button>
                  )}
                </div>
              )}
            </Space>
          </div>
        </div>
      </div>

      <div className="footer">
        <Space size={12}>
          <Button onClick={() => history.push('/qy/txl/org')}>取消</Button>
          <Button
            type="primary"
            disabled={files.length === 0}
            onClick={() => {
              let data = null;
              updateStore({ importing: true });
              const fakePercent = srcsrc(Math.random() * 20);
              setResult(getInitialResult(fakePercent));
              upload(
                `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/excel/import/direct/department`,
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
                    get(`/api/website/v1/excel/report/department/${batchNo}`)
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

                          updateStore({ showBatchRessult: true, importing: false });
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
    </StyledWrap>
  );
}
