//#region  import & styles

import React from 'react';
import {
  Button,
  Space,
  Icon,
  styled,
  useUpdateEffect,
  Drawer,
  useUnmount,
} from 'react-uni-comps';
import dayjs from 'dayjs';
import { FormSpaceRender } from 'antd-form-render';
import { displayDateFormat } from 'src/utils/helper';
import * as enums from '../common/enums';
import { useUpdateStore, useAppData } from 'simple-redux-store';
import { OpenData } from 'src/v2/common/Open';
import * as service from './service';
import { Spin } from 'antd';

const StyledDrawer = styled(Drawer)`
  .header {
    padding: 0 24px;
    height: 68px;
    line-height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;

    color: #1a1a1a;

    .uc-icon {
      cursor: pointer;
    }
  }

  .body {
    padding: 24px;
    overflow-y: scroll;
    border-top: 1px solid #ebebeb;
    .more {
      padding: 24px 0 16px;
      border-top: 1px solid #ebebeb;
      font-size: 12px;
      line-height: 20px;
      color: #8c8c8c;
      cursor: pointer;
    }
    h4 {
      margin-bottom: 16px;
    }
    .cert {
      display: flex;
    }
  }
  .footer {
    height: 64px;
    display: flex;
    align-items: center;
    border-top: 1px solid #ebebeb;
    justify-content: flex-end;
    padding-right: 24px;
  }
`;

const StyledItem = styled.div`
  font-size: 14px;
  line-height: 20px;
  .label {
    color: #8c8c8c;
  }
  .value {
    margin-top: 8px;
    color: #1a1a1a;
  }
`;

function Item({ label, value }) {
  return (
    <StyledItem>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </StyledItem>
  );
}

//#endregion

export default function ViewPeopleDetailDrawer({
  visible,
  onClose,
  selectedPeopleId,
  selectedPerson,
}) {
  const updateStore = useUpdateStore();
  const { personDetail, isWeb, loading = true } = useAppData();

  useUnmount(() => {
    updateStore({ personDetail: undefined, loading: undefined });
  });

  useUpdateEffect(() => {
    if (selectedPeopleId) {
      updateStore({ loading: true });
      service
        .getPeopleDetailById(selectedPeopleId)
        .then((res) => {
          updateStore({ personDetail: res.result, loading: false });
        })
        .catch(() => updateStore({ loading: false }));
    }
  }, [selectedPeopleId]);

  const layoutData = [
    {
      render() {
        return (
          <Item
            label="姓名"
            value={
              <OpenData
                openType="userName"
                openId={personDetail?.name}
              ></OpenData>
            }
          />
        );
      },
    },
    {
      render() {
        return <Item label="归属公司" value={personDetail?.companyName} />;
      },
    },
    {
      render() {
        return (
          <Item
            label="部门"
            value={
              <OpenData
                openType="deptName"
                openId={personDetail?.deptName}
              ></OpenData>
            }
          />
        );
      },
    },
    {
      render() {
        return <Item label="手机号" value={personDetail?.phone} />;
      },
    },
    {
      render() {
        return <Item label="邮箱" value={personDetail?.email} />;
      },
    },
    {
      render() {
        return (
          <Item
            label="证件号码"
            value={
              <Space>
                {enums.getEnumName(enums.CertiTypeEnum, personDetail?.certType)}
                {personDetail?.certNo}
              </Space>
            }
          />
        );
      },
    },
    {
      render() {
        return (
          <Item
            label="性别"
            value={enums.getEnumName(enums.GenderEnum, personDetail?.gender)}
          />
        );
      },
    },
    {
      render() {
        return (
          <Item
            label="婚姻状况"
            value={enums.getEnumName(
              enums.MarryStatusEnum,
              personDetail?.marryStatus
            )}
          />
        );
      },
    },
    {
      render() {
        return (
          <Item
            label="员工标签"
            value={personDetail?.labelNames
              ?.filter((i) => !!i)
              .map((item) => item)
              ?.join(',')}
          />
        );
      },
    },
    {
      render() {
        return (
          <Item
            label="入职日期"
            value={
              personDetail?.entryDate
                ? dayjs(personDetail.entryDate).format(displayDateFormat)
                : null
            }
          />
        );
      },
    },
    {
      render() {
        return (
          <Item
            label="出生日期"
            value={
              personDetail?.birthday
                ? dayjs(personDetail.birthday).format(displayDateFormat)
                : null
            }
          />
        );
      },
    },
    {
      render() {
        return <Item label="工号" value={personDetail?.staffNo} />;
      },
    },
    {
      render() {
        return (
          <Item
            label="员工类型"
            value={enums.getEnumName(
              enums.LabourRelationEnum,
              personDetail?.labourRelation
            )}
          />
        );
      },
    },
    {
      render() {
        return <Item label="工作地点" value={personDetail?.workPlaceName} />;
      },
    },
    {
      render() {
        return (
          <Item label="直接上级" value={personDetail?.directSuperiorName} />
        );
      },
    },
    {
      render() {
        return (
          <Item
            label="是否高管"
            value={enums.getEnumName(
              enums.YesNoEnum,
              personDetail?.seniorMamager
            )}
          />
        );
      },
    },
  ];

  return (
    <StyledDrawer
      onClose={onClose}
      visible={visible}
      style={{ width: 488 }}
      header={
        <>
          <div className="t">成员详情</div>
          <Icon type="uc-icon-guanbi" onClick={onClose} />
        </>
      }
      footer={
        <Space size={12}>
          <Button onClick={onClose}>返回</Button>
          <Button
            type="primary"
            onClick={() => {
              updateStore({
                selectedPeopleId: undefined, // close
                editPeople: selectedPerson,
                personDetail: undefined, // dispose
                drawerVisible: true, // open edit
              });
            }}
          >
            编辑
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading}>
        <FormSpaceRender
          size={24}
          direction="vertical"
          layoutData={layoutData}
        />
      </Spin>
    </StyledDrawer>
  );
}
