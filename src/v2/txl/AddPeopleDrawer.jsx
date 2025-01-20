//#region  import & styles

import React, { useState, useRef } from 'react';
import { Form, DatePicker, Select, Input, message, Radio } from 'antd';
import {
  Button,
  Space,
  Icon,
  styled,
  useUpdateEffect,
  Drawer,
  useMount,
  Cell,
  Switch,
} from 'react-uni-comps';
import dayjs from 'dayjs';
import FormRenderer, { FormSpaceRender } from 'antd-form-render';
import { get, post } from 'src/utils/req';
import OrgTreeSelect from 'src/v2/common/OrgTreeSelect';
import { getOptions, dateFormat, endDateFormat, dateTimeFormat } from 'src/utils/helper';
import * as enums from '../common/enums';
import PeopleSelect from '../common/PeopleSelect';
import { showSuccess } from 'src/common/msg';
import * as service from './service';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import { OpenData } from 'src/v2/common/Open';

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

//#endregion

export default function AddPeopleDrawer({ visible, onClose, selectedPerson, refresh }) {
  const [form] = Form.useForm();
  const { isWeb, orgInfo } = useAppData(({ app }) => app);
  // add/edit
  const [more, setMore] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sendSms, setSendSms] = useState(false);

  // login name suffix
  const [loginNameSuffix, setLoginNameSuffix] = useState('');

  // data
  const [companies, setCompanies] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [tags, setTags] = useState([]);

  const continueRef = useRef(false); // continue to add

  const [orgCustId, setOrgCustId] = useState(selectedPerson?.orgCustId);
  //#region  add people

  useMount(() => {
    // login name suffix
    service.getLoginNameSuffix().then((res) => {
      setLoginNameSuffix(res.result?.loginName || '');
    });
    // 公司
    service.getAllCompanies().then((res) => {
      setCompanies(getOptions(res.result, 'name', 'custId'));
    });

    // workplace
    service.getWorkPlace().then((res) => {
      setAddressList(getOptions(res.result, 'addrName', 'id'));
    });

    // tags
    service.getTagList().then(({ result = [] }) => setTags(getOptions(result, 'name', 'id')));

    if (selectedPerson) {
      form.resetFields();

      service.getPeopleDetailById(selectedPerson.id).then(({ result = {} }) => {
        selectedPerson.labelIds = result?.labelIds || [];
        form.resetFields();
      });
    }
  });

  useUpdateEffect(() => {
    setMore(false);
    form.resetFields();
    setShowHelp(false);
    if (selectedPerson) {
      setOrgCustId(selectedPerson.orgCustId);

      service.getPeopleDetailById(selectedPerson.id).then(({ result = {} }) => {
        selectedPerson.labelIds = result?.labelIds || [];
        form.resetFields();
      });
    }
  }, [selectedPerson]);

  const addLayoutData1 = [
    {
      type: Select,
      label: '归属公司',
      placeholder: '请选择归属公司',
      name: 'orgCustId',
      options: companies,
      rules: [{ required: true, message: '请选择' }],
      elProps: {
        showSearch: true,
        optionFilterProp: 'label',
        allowClear: true,
        disabled: !isWeb,
        onChange: (val) => {
          setOrgCustId(val);
          form.setFieldsValue({ departmentId: undefined });
        },
      },
      itemProps: {
        initialValue: selectedPerson?.orgCustId,
      },
    },
    isWeb
      ? {
          type: Input,
          label: '姓名',
          name: 'name',
          placeholder: '请输入姓名',
          itemProps: {
            initialValue: selectedPerson?.name,
            rules: [
              {
                required: true,
                message: '必填',
              },
            ],
          },
        }
      : {
          render() {
            return (
              <Form.Item label="姓名">
                <OpenData openType="userName" openId={selectedPerson?.name}></OpenData>
              </Form.Item>
            );
          },
        },
    isWeb
      ? {
          type: OrgTreeSelect,
          label: '部门',
          name: 'departmentId',
          elProps: {
            orgCustId: orgCustId,
            placeholder: '请选择部门',
          },
          itemProps: {
            initialValue: selectedPerson
              ? selectedPerson.departmentId != -1
                ? selectedPerson.departmentId
                : undefined
              : undefined,
            // rules: [
            //   {
            //     required: true,
            //     message: '必填',
            //   },
            // ],
          },
        }
      : {
          render() {
            return (
              <Form.Item label="部门">
                <OpenData openType="deptName" openId={selectedPerson?.deptName}></OpenData>
              </Form.Item>
            );
          },
        },
    {
      type: Input,
      label: '手机号',
      name: 'phone',
      elProps: {
        placeholder: '请输入手机号',
      },
      itemProps: {
        initialValue: selectedPerson?.phone,
        rules: [
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号码',
          },
        ],
      },
    },
    {
      type: Input,
      label: '邮箱',
      name: 'email',
      elProps: {
        placeholder: '请输入邮箱',
      },
      itemProps: {
        initialValue: selectedPerson?.email,
        rules: [
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '请输入正确的邮箱',
          },
        ],
      },
    },
    loginNameSuffix
      ? {
          render() {
            let v = selectedPerson?.loginName;
            if (v) {
              const i = v.indexOf(loginNameSuffix);
              if (i > -1) {
                v = v.slice(0, i);
              }
            }
            const data = [
              {
                type: Input,
                label: '自定义登录名',
                name: 'loginName',
                itemProps: {
                  initialValue: v,
                  rules: [
                    {
                      pattern: /^[a-zA-Z]+[a-zA-Z0-9_]+$/,
                      message: '请以字母开头且仅支持字母、数字、下划线',
                    },
                  ],
                },
                elProps: {
                  placeholder: '请以字母开头且仅支持字母、数字、下划线',
                  style: { width: 290 },
                },
              },
              {
                render() {
                  return loginNameSuffix;
                },
              },
            ];
            return <FormSpaceRender layoutData={data} />;
          },
        }
      : {
          render() {
            return null;
          },
        },
    {
      render() {
        return (
          showHelp && (
            <div style={{ color: 'red' }}>{`手机号/邮箱${
              loginNameSuffix ? `/自定义登录名` : ''
            }须至少填写1项`}</div>
          )
        );
      },
    },
    {
      render() {
        return (
          !selectedPerson && (
            <Cell
              style={{ marginLeft: -12 }}
              label="短信通知员工"
              content={<Switch checked={sendSms} onChange={setSendSms} />}
            ></Cell>
          )
        );
      },
    },
  ];

  const addLayoutData2 = [
    {
      type: Radio.Group,
      name: 'sendSms',
      elProps: {
        options: [
          { label: '立即通知', value: 1 },
          { label: '定时通知', value: 2 },
        ],
      },
      itemProps: {},
    },
    {
      type: DatePicker,
      name: 'scheduledTimeSendSms',
      elProps: {
        placeholder: '请选择通知时间',
        format: dateTimeFormat,
        showTime: true,
        style: {
          width: 240,
        },
      },
      itemProps: {},
    },
  ];

  const addLayoutData3 = [
    {
      render: () => <h4>个人信息</h4>,
    },
    {
      render: () => (
        <Space className="cert">
          <Form.Item name="certType" initialValue={selectedPerson?.certType}>
            <Select
              allowClear
              placeholder="证件类型"
              options={getOptions(enums.CertiTypeEnum)}
              style={{ width: 86 }}
            />
          </Form.Item>
          <Form.Item name="certNo" initialValue={selectedPerson?.certNo}>
            <Input placeholder="请输入证件号" style={{ width: 344 }} />
          </Form.Item>
        </Space>
      ),
    },
    {
      type: Select,
      label: '性别',
      name: 'gender',
      elProps: {
        allowClear: true,
        options: getOptions(enums.GenderEnum),
      },
      itemProps: {
        initialValue: selectedPerson?.gender,
      },
    },
    {
      type: Select,
      label: '婚姻状况',
      name: 'marryStatus',
      elProps: {
        options: getOptions(enums.MarryStatusEnum),
        placeholder: '请选择婚姻状况',
        allowClear: true,
      },
      itemProps: {
        initialValue: selectedPerson?.marryStatus,
      },
    },
    {
      type: Select,
      label: '员工标签',
      name: 'labelIds',
      elProps: {
        options: tags,
        mode: 'tags',
        placeholder: '请选择员工标签',
        allowClear: true,
      },
      itemProps: {
        initialValue: selectedPerson?.labelIds,
      },
    },
    {
      type: DatePicker,
      label: '入职日期',
      name: 'entryDate',
      elProps: {
        placeholder: '请选择入职日期',
        style: {
          width: '100%',
        },
      },
      itemProps: {
        initialValue: selectedPerson?.entryDate ? dayjs(selectedPerson.entryDate) : undefined,
      },
    },
    {
      type: DatePicker,
      label: '出生日期',
      name: 'birthday',
      elProps: {
        placeholder: '请选择出生日期',
        style: {
          width: '100%',
        },
      },
      itemProps: {
        initialValue: selectedPerson?.birthday ? dayjs(selectedPerson.birthday) : undefined,
      },
    },
    {
      render: () => <h4>工作信息</h4>,
    },
    {
      type: Input,
      label: '工号',
      name: 'staffNo',
      placeholder: '请输入工号',
      itemProps: {
        initialValue: selectedPerson?.staffNo,
      },
    },
    {
      type: Select,
      label: '员工类型',
      name: 'labourRelation',
      elProps: {
        placeholder: '请选择员工类型',
        options: getOptions(enums.LabourRelationEnum),
        allowClear: true,
      },
      itemProps: {
        initialValue: selectedPerson?.labourRelation,
      },
    },
    {
      type: Select,
      label: '工作地点',
      name: 'workPlace',
      options: addressList,
      allowClear: true,
      placeholder: '请选择工作地点',
      itemProps: {
        initialValue: selectedPerson?.workPlace ? Number(selectedPerson?.workPlace) : undefined,
      },
    },
    {
      type: PeopleSelect,
      label: '直接上级',
      name: 'directSuperior',
      itemProps: {
        initialValue: selectedPerson?.directSuperior,
      },
    },
    {
      type: Radio.Group,
      label: '是否高管',
      name: 'seniorMamager',
      elProps: {
        options: getOptions(enums.YesNoEnum),
      },
      itemProps: {
        initialValue: selectedPerson?.seniorMamager,
      },
    },
  ];
  //#endregion

  const onSumit = (values) => {
    let postData = { ...values };

    if (values.entryDate) {
      postData.entryDate = dayjs(values.entryDate).format(dateFormat);
    }

    if (values.birthday) {
      postData.birthday = dayjs(values.birthday).format(dateFormat);
    }

    if (
      (!values.phone && !values.email && !values.loginName && loginNameSuffix) ||
      (!loginNameSuffix && !values.phone && !values.email)
    ) {
      setShowHelp(true);
      return;
    } else {
      setShowHelp(false);
    }

    if (sendSms) {
      postData.sendSms = true;

      if (values.scheduledTimeSendSms) {
        postData.scheduledTimeSendSms = dayjs(values.scheduledTimeSendSms).format(dateTimeFormat);
      }
    } else {
      if (postData.scheduledTimeSendSms) {
        delete postData.scheduledTimeSendSms;
      }
    }

    if (selectedPerson) {
      postData = { ...selectedPerson, ...postData };
    }

    if (loginNameSuffix && postData.loginName) {
      postData.loginName = postData.loginName + loginNameSuffix;
    }

    post(`/api/customer/v5/simple/staff/${selectedPerson ? 'update' : 'create'}`, postData).then(
      () => {
        setShowHelp(false);
        showSuccess('保存成功');
        refresh?.();

        form.resetFields();
        if (!continueRef.current) {
          // reset
          onClose();
        }
        continueRef.current = false;
      }
    );
  };

  return (
    <StyledDrawer
      onClose={onClose}
      visible={visible}
      style={{ width: 488 }}
      header={
        <>
          <div className="t">{selectedPerson ? '编辑' : '添加'}成员</div>
          <Icon type="uc-icon-guanbi" onClick={onClose} />
        </>
      }
      footer={
        <Space size={12}>
          <Button onClick={onClose}>取消</Button>
          <Button
            type={selectedPerson ? 'primary' : 'default'}
            onClick={() => {
              form.submit();
            }}
          >
            {selectedPerson ? '保存' : '完成'}
          </Button>

          {!selectedPerson && (
            <Button
              type="primary"
              onClick={() => {
                form.submit();
                continueRef.current = true;
                // form.resetFields();
              }}
            >
              完成并继续添加
            </Button>
          )}
        </Space>
      }
    >
      <Form form={form} onFinish={onSumit} layout="vertical">
        <FormRenderer layoutData={addLayoutData1} />
        {!selectedPerson && sendSms && <FormSpaceRender layoutData={addLayoutData2} />}
        <div className="more" onClick={() => setMore(!more)}>
          <Space size={4}>
            更多信息（选填）
            <Icon type={more ? 'icon-xiangshang_line' : 'icon-xiangxia_line'} />
          </Space>
        </div>
        {more && <FormRenderer layoutData={addLayoutData3} />}
      </Form>
    </StyledDrawer>
  );
}
