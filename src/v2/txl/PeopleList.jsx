//#region  import & style
import React, { useState, useCallback } from 'react';
import { Form, Table, Select, DatePicker, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Space,
  Icon,
  useUpdateEffect,
  IconArrow,
  styled,
  AlertDialog,
  uniqArray,
  Input,
  PopMenu,
  useMount,
  useUnmount,
  Tooltip,
} from 'react-uni-comps';
import dayjs from 'dayjs';
import { post } from 'src/utils/req';
import { useAntdTable } from 'ahooks';
import FormRenderer, { FormSpaceRender } from 'antd-form-render';
import Dialog from 'src/common/Dialog';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import { showError, showSuccess } from 'src/common/msg';
import usePageTitle from 'src/hooks/usePageTitle';
import AddPeopleDrawer from './AddPeopleDrawer';
import { dateFormat, endDateFormat } from 'src/utils/helper';
import { getOptions } from 'src/utils/helper';
import * as enums from '../common/enums';
import * as service from './service';
import OrgPeopleDialogSelect from '../common/OrgPeopleDialogSelect';
import { fetchAndDownload } from 'src/utils/fetch-blob';
import { getHostPrefix } from 'src/utils/host';
import { OpenData } from 'src/v2/common/Open';
import ViewPeopleDetailDrawer from './ViewPeopleDetailDrawer';

const StyledWrap = styled.div`
  background: #fff;
  position: relative;
  padding: 24px 20px;
  flex: 1;
  min-width: 880px;

  .ant-form-item {
    margin-bottom: 0;
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

//#endregion

export default function PeopleList(props) {
  usePageTitle('人员通讯录');
  const {
    isWeb,
    selectedOrg,
    orgInfo = {},
    selectedPeople = [],
    selectedKeys = [],
    lzDialogVisible = false,
    // tags = [],
    editPeople,
    drawerVisible,
    selectedPerson,
    selectedPeopleId,
  } = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();
  const [form] = Form.useForm();

  const [count, setCount] = useState('');
  const history = useHistory();

  const [expand, setExpand] = useState(false);

  // add/edit
  // const [pId, setPId] = useState(-1); // -1 closed, 0 means add, not 0 means edit

  const onDrawerClose = useCallback(() => {
    // setPId(-1);
    updateStore({ drawerVisible: false, selectedPeople: undefined });
  }, [updateStore]);

  const onViewDetailDrawerClose = useCallback(() => {
    updateStore({
      selectedPeopleId: undefined,
      selectedPerson: undefined,
    });
  }, [updateStore]);

  // common

  // 操作离职
  const [lzForm] = Form.useForm();

  useMount(() => {
    // tags
    // service
    //   .getTagList()
    //   .then(({ result = [] }) => updateStore({ tags: getOptions(result, 'name', 'id') }));
  });

  useUnmount(() => {
    updateStore({
      lzDialogVisible: undefined,
      selectedPeople: undefined,
      // tags: undefined,
      selectedPerson: undefined,
      drawerVisible: undefined,
      selectedPeopleId: undefined,
    });
  });

  const getTableData = ({ current = 1, pageSize }, formData) => {
    const data = { ...formData };

    if (Array.isArray(data.entryDate)) {
      data.entryDateStart = dayjs(data.entryDate[0]).format(dateFormat);
      data.entryDateEnd = dayjs(data.entryDate[1]).format(endDateFormat);
      delete data.entryDate;
    }

    if (Array.isArray(data.birthday)) {
      data.birthdayStart = dayjs(data.birthday[0]).format(dateFormat);
      data.birthdayEnd = dayjs(data.birthday[1]).format(endDateFormat);
      delete data.birthday;
    }

    const param = {
      employeeStatusSet: ['N', 'S'],
      ...data,
    };

    if (selectedOrg) {
      param.departmentId = selectedOrg.id;
    }

    return post(`/api/customer/v5/simple/staff/page/list`, {
      currentPage: current,
      pageSize,
      param,
    }).then((res) => {
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

  useUpdateEffect(() => {
    refresh();
  }, [selectedOrg]);

  //#region  search def

  const searchLayoutData = [
    {
      type: Input,
      label: '',
      placeholder: '搜索姓名/手机号',
      name: 'phoneOrNameLike',
      elProps: {
        ime: true,
        clearable: true,
        style: { width: 160 },
        prefix: <Icon type="uc-icon-sousuo" />,
        onClear: () => {
          reset();
        },
      },
    },
    {
      type: Button,
      elProps: {
        as: 'div',
        style: { width: 32, height: 32, minWidth: 'unset' },
        icon: <Icon type={expand ? 'icon-xiangshang_line' : 'icon-zhankai_line'} />,
        onClick: (e) => {
          setExpand(!expand);
        },
      },
    },
    {
      type: Button,
      elProps: {
        children: '查询',
        style: { width: 80 },
        onClick: submit,
        outlined: true,
      },
    },
    {
      type: Button,
      elProps: {
        children: '重置',
        style: { width: 80 },
        onClick: reset,
      },
    },
  ];

  const advanceSearchLayoutData = [
    {
      type: DatePicker.RangePicker,
      label: '入职日期',
      name: 'entryDate',
      elProps: {
        style: { width: '100%' },
      },
    },
    // {
    //   type: DatePicker.RangePicker,
    //   label: '出生日期',
    //   name: 'birthday',
    //   elProps: {
    //     style: { width: '100%' },
    //   },
    // },

    {
      type: Select,
      label: '员工性别',
      name: 'gender',
      elProps: {
        placeholder: '请选择员工性别',
        allowClear: true,
        options: getOptions(enums.GenderEnum),
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
      type: Input,
      label: '员工工号',
      placeholder: '请输入工号',
      name: 'staffNo',
    },
    // {
    //   type: Select,
    //   label: '员工标签',
    //   name: 'tags',
    //   elProps: {
    //     options: tags,
    //     mode: 'tags',
    //     placeholder: '请选择员工标签',
    //     allowClear: true,
    //   },
    // },
  ];

  //#endregion

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
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      render: (text) => {
        return <OpenData openType="deptName" openId={text}></OpenData>;
      },
    },

    {
      title: '操作',
      render: (text, record) => {
        const menu = (
          <Menu>
            <Menu.Item
              onClick={() =>
                AlertDialog.show({
                  title: '重置密码',
                  content: `确认重置该员工密码吗？`,
                  wait: true,
                  onConfirm: (close) => {
                    post(`/api/website/v1/customerOrg/reset/passwd`, {
                      staffCustId: record.staffCustId,
                    }).then((res) => {
                      close();
                      AlertDialog.show({
                        title: '重置成功',
                        content: `${record.name}的登录新密码为${res.result}`,
                        confirmText: '我知道了',
                        onConfirm: (close) => close(),
                      });
                    });
                  },
                  onCancel: (close) => {
                    close();
                  },
                  confirmText: '确认重置',
                  cancelText: '取消',
                })
              }
            >
              重置密码
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                updateStore({ selectedPeople: [record], lzDialogVisible: true });
              }}
            >
              操作离职
            </Menu.Item>
          </Menu>
        );
        return (
          <Space size={16}>
            <Button
              as="a"
              onClick={() => updateStore({ drawerVisible: true, selectedPerson: record })}
            >
              编辑
            </Button>
            <Button
              as="a"
              onClick={() =>
                updateStore({
                  selectedPeopleId: record.id,
                  selectedPerson: record,
                })
              }
            >
              查看详情
            </Button>

            {isWeb && (
              <PopMenu content={menu}>
                <Button as="a">更多</Button>
              </PopMenu>
            )}
          </Space>
        );
      },
    },
  ];

  //#endregion

  //#region   dialog layout
  const lzLayout = [
    {
      render() {
        return <Form.Item label="离职员工">{selectedPeople.map((p) => p.name + ' ')}</Form.Item>;
      },
    },
    {
      type: DatePicker,
      label: '离职日期',
      placeholder: '请选择离职日期',
      name: 'leaveDate',
      //   rules: [{ required: true, message: '请选择' }],
      elProps: {
        style: { width: '100%' },
      },
    },
  ];
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

  // 部门人员组件测试
  const [op, setOp] = useState([]);

  return (
    <StyledWrap>
      {/* <OrgPeopleDialogSelect
        showSearch
        value={op}
        visible={test}
        onClose={() => updateStore({ test: false })}
        onConfirm={setOp}
      /> */}
      <div className="top">
        <div className="name">
          {selectedOrg ? (
            <OpenData openType="deptName" openId={selectedOrg.name}></OpenData>
          ) : (
            orgInfo.name
          )}
          （{count}人）
        </div>
        <div className="lz" onClick={() => history.push('/qy/txl/people/lz')}>
          已离职员工 <IconArrow direction="right" />
        </div>
      </div>
      <div className="head search-form">
        <Form
          form={form}
          // onFinish={submit}
          style={{ marginBottom: 16, width: '100%' }}
          layout="horizontal"
        >
          <FormSpaceRender
            layoutData={searchLayoutData}
            size={16}
            wrap
            style={{ position: 'relative', width: '100%' }}
          />
          {expand && (
            <FormSpaceRender
              className="extra-layout"
              layoutData={advanceSearchLayoutData}
              size={16}
              wrap
            />
          )}
        </Form>
        <Space size={16} className="operate">
          {isWeb && (
            <>
              <Button
                type="primary"
                onClick={() => updateStore({ drawerVisible: true, selectedPerson: undefined })}
              >
                添加成员
              </Button>
              <Button onClick={() => history.push('/qy/txl/people/batch')}>批量导入/修改</Button>
            </>
          )}

          {/* <Tooltip title="导出符合搜索条件全部人员"> */}
          <Button
            onClick={() => {
              form.validateFields().then((values) => {
                const data = { ...values };

                if (Array.isArray(data.entryDate)) {
                  data.entryDateStart = dayjs(data.entryDate[0]).format(dateFormat);
                  data.entryDateEnd = dayjs(data.entryDate[1]).format(endDateFormat);
                  delete data.entryDate;
                }

                // if (Array.isArray(data.birthday)) {
                //   data.birthdayStart = dayjs(data.birthday[0]).format(dateFormat);
                //   data.birthdayEnd = dayjs(data.birthday[1]).format(endDateFormat);
                //   delete data.birthday;
                // }

                const param = {
                  employeeStatusSet: ['N', 'S'],
                  ...data,
                };

                if (selectedOrg) {
                  param.departmentId = selectedOrg.id;
                }

                fetchAndDownload(
                  `https://${getHostPrefix()}api.zuifuli.com/api/website/v1/export/simple/select/staff`,
                  '人员列表.xlsx',
                  'post',
                  param
                );
              });
            }}
          >
            <Space size={4}>
              <Icon type="icon-xiazai" /> 导出
            </Space>
          </Button>
          {/* </Tooltip> */}

          {isWeb && (
            <Button
              danger
              disabled={selectedPeople.length === 0}
              onClick={() => {
                updateStore({ lzDialogVisible: true });
              }}
            >
              批量离职
            </Button>
          )}
        </Space>
      </div>

      <Table
        columns={columns}
        {...tableProps}
        loading={loading}
        rowKey="id"
        style={{ marginTop: 16 }}
        rowSelection={{ type: 'checkbox', ...rowSelection }}
      />
      <AddPeopleDrawer
        visible={drawerVisible}
        onClose={onDrawerClose}
        selectedPerson={selectedPerson}
        refresh={refresh}
      />

      <ViewPeopleDetailDrawer
        visible={selectedPeopleId}
        onClose={onViewDetailDrawerClose}
        selectedPeopleId={selectedPeopleId}
        selectedPeople={selectedPerson}
      />

      {/* 操作离职 */}
      <Dialog
        visible={lzDialogVisible}
        onClose={() => updateStore({ lzDialogVisible: false })}
        style={{ width: 454, height: 228 }}
        title="操作离职"
        footer={
          <Space size={16} style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button
              type="default"
              htmlType="reset"
              onClick={() => {
                updateStore({ selectedPeople: [], lzDialogVisible: false });
              }}
            >
              取消
            </Button>
            <Button type="primary" onClick={() => lzForm.submit()} wait>
              确认离职
            </Button>
          </Space>
        }
      >
        <Form
          form={lzForm}
          onFinish={(values) => {
            if (!values.leaveDate) {
              showError('请选择离职日期');
              return;
            }

            const data = selectedPeople.map((p) => ({
              ...p,
              resignDate: dayjs(values.leaveDate).format(dateFormat),
              employeeStatus: 'D',
            }));

            service.batchLizhiPeole(data).then(() => {
              showSuccess('操作成功');
              refresh();
              lzForm.resetFields();
              updateStore({ selectedPeople: [], lzDialogVisible: false });
            });
          }}
        >
          <FormRenderer layoutData={lzLayout} />
        </Form>
      </Dialog>
    </StyledWrap>
  );
}
