//#region  import & style
import React, { useState } from 'react';
import { Form, Table, Select, DatePicker } from 'antd';
import {
  Button,
  Space,
  Icon,
  Drawer,
  styled,
  Input,
  Tabs,
  uniqArray,
  useMount,
} from 'react-uni-comps';
import { getOptions } from 'src/utils/helper';
import * as enums from '../common/enums';
import { useAntdTable, useUnmount } from 'ahooks';
import { FormSpaceRender } from 'antd-form-render';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import OrgTreeSelect from 'src/v2/common/OrgTreeSelect';
import { showSuccess } from 'src/common/msg';
import * as service from './service';
import { OpenData } from 'src/v2/common/Open';
import dayjs from 'dayjs';
import { dateFormat, endDateFormat } from 'src/utils/helper';

const StyledTabs = styled(Tabs)`
  .uc-tabs-header-wrap {
    height: 68px;
    border-bottom: none;
    color: #1a1a1a;
    font-size: 16px;
    text-align: center;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;

    .uc-tabs-header-item {
      width: 100px;
    }
    .uc-tabs-extra {
      margin-left: 0;
      color: #999;
      font-size: 14px;
    }
  }
`;

const StyledWrap = styled.div`
  background: #fff;
  position: relative;
  flex: 1;

  .ant-form-item {
    margin-bottom: 0;
    width: 220px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .name {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;

      color: #1a1a1a;
    }

    .lz {
      color: #8c8c8c;
      cursor: pointer;
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    position: relative;
    .extra-layout {
      width: 960px;
      margin-top: 20px;
      .afr-flex > .ant-row {
        margin-bottom: 16px;
      }

      .ant-form-item-control-input {
        width: 220px;
      }
    }
    > .operate {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const StyledDrawer = styled(Drawer)`
  .header {
    padding: 0 24px 0 4px;
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
    /* identical to box height, or 125% */

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

export default function TagAddPeopleDrawer({ visible, onClose, onAdded }) {
  const {
    orgInfo = {},
    selectedPeople = [],
    selectedKeys = [],
    selectedTag,
  } = useAppData(({ app }) => app);

  const updateStore = useUpdateStore();
  const [form] = Form.useForm();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState('');

  // data
  // const [companies, setCompanies] = useState([]);
  const [addressList, setAddressList] = useState([]);
  // const [tags, setTags] = useState([]);

  // common

  useMount(() => {
    // 公司
    // service.getAllCompanies().then((res) => {
    //   setCompanies(getOptions(res.result, 'name', 'custId'));
    // });

    // workplace
    service.getWorkPlace().then((res) => {
      setAddressList(getOptions(res.result, 'addrName', 'id'));
    });

    // tags
    // service.getTagList().then(({ result = [] }) => setTags(getOptions(result, 'name', 'id')));
  });

  useUnmount(() => {
    updateStore({ submitting: undefined, selectedPeople: undefined, selectedKeys: undefined });
  });

  const getTableData = ({ current = 1, pageSize }, formData) => {
    const data = { ...formData };
    const v = form.getFieldsValue();

    if (Array.isArray(data.entryDate)) {
      data.entryDateStart = dayjs(data.entryDate[0]).format(dateFormat);
      data.entryDateEnd = dayjs(data.entryDate[1]).format(endDateFormat);
      delete data.entryDate;
    }

    if (v.departmentId) {
      data.departmentId = v.departmentId;
    }

    const param = {
      employeeStatusSet: ['N', 'S'],
      ...data,
    };

    return service
      .getPeopleList({
        currentPage: current,
        pageSize,
        param,
      })
      .then((res) => {
        const { result = {} } = res;
        setCount(result.totalItem || 0);
        return {
          total: result.totalItem,
          list: result.resultList || [],
        };
      });
  };

  const { tableProps, search, loading, refresh } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });
  const { submit, reset } = search;

  //#region  tabel cols def

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      render: (text) => {
        return <OpenData openType="userName" openId={text}></OpenData>;
      },
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render(text) {
        if (text) {
          return enums.getEnumName(enums.GenderEnum, text);
        }
        return text;
      },
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      render: (text) => {
        return <OpenData openType="deptName" openId={text}></OpenData>;
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
  ];

  if (index === 1) {
    columns.push({
      title: '操作',
      render: (text, record) => {
        return (
          <Button
            as="a"
            onClick={() => {
              updateStore({
                selectedPeople: selectedPeople.filter((p) => p.id !== record.id),
                selectedKeys: selectedKeys.filter((a) => a !== record.id),
              });
            }}
          >
            删除
          </Button>
        );
      },
    });
  }

  //#endregion

  const pRowKeys = (a, b) => a === b;
  const predicate = (a, b) => a?.id === b?.id;

  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        updateStore({
          selectedPeople: uniqArray(selectedPeople.concat(record), predicate),
          selectedKeys: uniqArray(selectedKeys.concat(record.id), pRowKeys),
        });
      } else {
        updateStore({
          selectedPeople: selectedPeople.filter((o) => o.id !== record.id),
          selectedKeys: selectedKeys.filter((k) => k !== record.id),
        });
      }
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        updateStore({
          selectedPeople: uniqArray(
            selectedPeople.concat(selectedRows.filter((o) => !!o)),
            predicate
          ),
          selectedKeys: uniqArray(
            selectedKeys.concat(selectedRows.filter((o) => !!o).map((r) => r.id)),
            pRowKeys
          ),
        });
      } else {
        updateStore({
          selectedPeople: selectedPeople.filter((p) => !changeRows.find((a) => a?.id === p?.id)),
          selectedKeys: selectedKeys.filter((k) => !changeRows.find((r) => r?.id === k)),
        });
      }
    },
    selectedRowKeys: selectedKeys,
  };

  const layoutData = [
    {
      type: Input,
      label: '姓名',
      name: 'name',
      elProps: {
        placeholder: '请输入姓名',
      },
    },
    {
      type: Input,
      label: '手机号',
      name: 'phone',
      elProps: {
        placeholder: '请输入手机号',
      },
    },
    {
      type: Select,
      label: '员工类型',
      name: 'labourRelation',
      elProps: {
        options: getOptions(enums.LabourRelationEnum),
        allowClear: true,
      },
      placeholder: '请选择员工类型',
    },
    {
      type: OrgTreeSelect,
      label: '部门',
      name: 'departmentId',
      elProps: {
        orgCustId: orgInfo?.custId,
        placeholder: '请选择部门',
      },
    },
    {
      type: Select,
      label: '性别',
      name: 'gender',
      elProps: {
        placeholder: '请选择性别',
        allowClear: true,
        options: getOptions(enums.GenderEnum),
      },
    },

    {
      type: Select,
      label: '职场',
      name: 'workPlace',
      options: addressList,
      allowClear: true,
      placeholder: '请选择职场',
    },
    {
      type: DatePicker.RangePicker,
      label: '入职日期',
      name: 'entryDate',
      elProps: {
        style: { width: '100%' },
      },
    },
    {
      render() {
        return (
          <Form.Item label={<span />}>
            <Space size={16} style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button outlined htmlType="submit">
                查询
              </Button>
              <Button onClick={reset}>重置</Button>
            </Space>
          </Form.Item>
        );
      },
    },
  ];

  const onConfirm = () => {
    service
      .batchAddTagPeople(
        selectedPeople.map((p) => ({
          name: p.name,
          labelId: selectedTag?.id,
          custId: p.staffCustId,
        }))
      )
      .then(() => {
        showSuccess('添加成功');
        updateStore({ selectedPeople: [], selectedKeys: [] });
        onAdded?.();
        onClose();
      });
  };

  const renderFooter = () => {
    return index === 1 ? (
      <Space size={12}>
        <Button onClick={onClose}>取消</Button>
        <Button type="primary" disabled={selectedPeople.length === 0} onClick={onConfirm}>
          添加
        </Button>
      </Space>
    ) : (
      <Space size={12}>
        <Button onClick={onClose}>取消</Button>
        <Button type="primary" disabled={selectedPeople.length === 0} onClick={onConfirm}>
          确认
        </Button>
      </Space>
    );
  };

  return (
    <StyledDrawer
      onClose={onClose}
      visible={visible}
      style={{ width: 1000 }}
      header={
        <>
          <StyledTabs
            value={index}
            onChange={setIndex}
            underline="64px"
            extra={`(${selectedPeople.length})`}
          >
            <Tabs.Tab title="添加员工" />
            <Tabs.Tab title="已选员工" />
          </StyledTabs>
          <Icon type="uc-icon-guanbi" onClick={onClose} />
        </>
      }
      footer={renderFooter()}
    >
      <StyledWrap>
        {index === 0 ? (
          <>
            <Form
              form={form}
              onFinish={submit}
              style={{ marginBottom: 16, width: '100%' }}
              layout="vertical"
            >
              <FormSpaceRender
                layoutData={layoutData}
                size={16}
                wrap
                style={{ position: 'relative', width: '100%' }}
              />
            </Form>
            <Table
              key={index}
              columns={columns}
              {...tableProps}
              loading={loading}
              rowKey="id"
              style={{ marginTop: 16 }}
              rowSelection={{ type: 'checkbox', ...rowSelection }}
            />
          </>
        ) : (
          <>
            <Space size={16} style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button
                onClick={() => {
                  updateStore({ selectedPeople: [], selectedKeys: [] });
                }}
              >
                清空
              </Button>
            </Space>
            <Table
              key={index}
              columns={columns}
              rowKey="id"
              dataSource={selectedPeople}
              style={{ marginTop: 16 }}
              // rowSelection={{ type: 'checkbox', ...rowSelection }}
            />
          </>
        )}
      </StyledWrap>
    </StyledDrawer>
  );
}
