//#region  import & style
import React, { useState } from 'react';
import { Form, Table, Menu } from 'antd';
import {
  Button,
  Space,
  Icon,
  AlertDialog,
  styled,
  useUpdateEffect,
  PopMenu,
  Input,
  Checkbox,
} from 'react-uni-comps';
import dayjs from 'dayjs';
import { get, post } from 'src/utils/req';
import { useAntdTable, useUnmount } from 'ahooks';
import FormRenderer, { FormSpaceRender } from 'antd-form-render';
import Dialog from 'src/common/Dialog';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import OrgTreeSelect from '../common/OrgTreeSelect';
import { showError, showSuccess } from 'src/common/msg';
import usePageTitle from 'src/hooks/usePageTitle';
import PeopleSelect from '../common/PeopleSelect';
import * as service from './service';
import { OpenData } from 'src/v2/common/Open';

const StyledWrap = styled.div`
  background: #fff;
  position: relative;
  padding: 24px 20px;
  flex: 1;
  min-width: 880px;

  .ant-form-item {
    margin-bottom: 0;
  }

  .head {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledTag = styled.span`
  width: 48px;
  height: 20px;
  background: #0d72ff;

  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 14px;
  border-radius: 4px;
`;

//#endregion

export default function OrgList({ history }) {
  usePageTitle('部门管理');
  const {
    isWeb,
    selectedOrg, // select from table
    editOrg, // editing org
    selectedOrgs = [],
    orgInfo = {},
    orgId = -1, // -1 closed, 0 means add, not 0 means edit
    submitting,
  } = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();
  const [form] = Form.useForm();

  // add/edit org
  const [orgForm] = Form.useForm();

  // cleanup
  useUnmount(() => {
    updateStore({
      submitting: undefined,
      selectedOrgs: undefined,
      selectedOrg: undefined,
      editOrg: undefined,
    });
  });

  const getTableData = ({ current = 1, pageSize }, formData) => {
    return get(`/api/customer/v2/department/tree`, {
      status: 'A',
      needChargeName: true,
      ...formData,
    }).then((res) => {
      const { result = [] } = res;

      return {
        total: result.length,
        list: result,
      };
    });
  };

  const { tableProps, search, loading, refresh } = useAntdTable(getTableData, {
    defaultPageSize: 100,
    form,
  });
  const { submit, reset } = search;

  //#region  search def

  const layoutData = [
    {
      type: Input,
      label: '',
      placeholder: '搜索部门名称',
      name: 'name',
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
        outlined: true,
        children: '查询',
        onClick: submit,
      },
    },
  ];

  //#endregion

  //#region  tabel cols def

  const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      width: 550,
      render: (text, record) => {
        return (
          <span data-id={record.id}>
            {isWeb ? (
              <Checkbox
                size={14}
                onChange={(checked) => {
                  if (!checked) {
                    updateStore({ selectedOrgs: selectedOrgs.filter((o) => o.id !== record.id) });
                  } else {
                    updateStore({ selectedOrgs: [...selectedOrgs, record] });
                  }
                }}
              >
                {text}
              </Checkbox>
            ) : (
              <OpenData openType="deptName" openId={text}></OpenData>
            )}
            {record.departmentType === 'B' && <StyledTag>子公司</StyledTag>}
          </span>
        );
      },
    },
    {
      title: '成员数',
      dataIndex: 'staffCount',
    },
    {
      title: '部门负责人',
      dataIndex: 'chargeName',
      render: (text) => {
        return <OpenData openType="userName" openId={text}></OpenData>;
      },
    },
    {
      title: '操作',
      render: (text, record) => {
        const menu = (
          <Menu>
            <Menu.Item
              onClick={() => {
                AlertDialog.show({
                  title: '删除部门',
                  content: `部门删除后不可恢复，是否继续？`,
                  onConfirm: (close) => {
                    service
                      .updateOrg({ id: record.id, status: 'S' })
                      .then(() => {
                        showSuccess('删除成功');
                        refresh();
                        close();
                      })
                      .catch(close);
                  },
                  confirmText: '删除',
                  cancelText: '取消',
                  onCancel: (close) => close(),
                });
              }}
            >
              删除部门
            </Menu.Item>
          </Menu>
        );
        return isWeb ? (
          <Space size={16}>
            <Button
              as="a"
              onClick={() => {
                updateStore({ orgId: 0, selectedOrg: record, editOrg: null });
              }}
            >
              添加子部门
            </Button>
            <Button
              as="a"
              onClick={() => {
                updateStore({ orgId: record.id, editOrg: record, selectedOrg: null });
              }}
            >
              编辑部门
            </Button>
            <PopMenu content={menu}>
              <Button as="a">更多</Button>
            </PopMenu>
          </Space>
        ) : null;
      },
    },
  ];

  //#endregion

  //#region org add/edit

  const isAddChildOrg = selectedOrg && orgId === 0;

  useUpdateEffect(() => {
    orgForm.resetFields();
  }, [editOrg, selectedOrg, orgId]);

  const addEditLayout = [
    {
      type: Input,
      label: '部门名称',
      name: 'name',
      itemProps: {
        placeholder: '请输入部门名称',
        initialValue: editOrg?.name,
        rules: [
          {
            required: true,
            message: '请输入',
          },
        ],
      },
    },
    {
      type: OrgTreeSelect,
      label: '上级部门',
      name: 'parentId',
      elProps: {
        orgCustId: orgInfo?.custId,
        disabled: isAddChildOrg || orgId > 0,
        useGroupApi: true,
      },
      itemProps: {
        initialValue: isAddChildOrg
          ? selectedOrg?.id
          : editOrg?.parentId === -1
          ? undefined
          : editOrg?.parentId,
      },
    },
    // {
    //   render() {
    //     const renderOpenData = selectedOrg?.departmentType == 'B';

    //     return (
    //       <Form.Item
    //         name="parentId"
    //         label="上级部门"
    //         initialValue={
    //           isAddChildOrg
    //             ? selectedOrg?.id
    //             : editOrg?.parentId === -1
    //             ? undefined
    //             : editOrg?.parentId
    //         }
    //       >
    //         {renderOpenData ? (
    //           <OpenData openType="deptName" openId={selectedOrg?.name || '无'}></OpenData>
    //         ) : (
    //           <OrgTreeSelect
    //             useGroupApi
    //             orgCustId={orgInfo?.custId}
    //             disabled={isAddChildOrg || orgId > 0}
    //           />
    //         )}
    //       </Form.Item>
    //     );
    //   },
    // },
    {
      type: PeopleSelect,
      label: '部门负责人',
      itemProps: {
        initialValue: editOrg?.chargeCustId,
      },
      name: 'chargeCustId',
    },
  ];
  //#endregion

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      updateStore({ selectedOrgs: selectedRows });
    },
    onSelect: (record, selected, selectedRows) => {
      updateStore({ selectedOrgs: selectedRows });
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      updateStore({ selectedOrgs: selectedRows });
    },
  };

  return (
    <StyledWrap>
      <div className="head">
        <Form form={form} onFinish={search} style={{ marginBottom: 16 }} autoComplete="off">
          <FormSpaceRender
            layoutData={layoutData}
            size={16}
            wrap
            style={{ position: 'relative', width: '100%' }}
          />
        </Form>
        {isWeb && (
          <Space size={16} style={{ alignItems: 'flex-start' }}>
            <Button
              type="primary"
              onClick={() => updateStore({ orgId: 0, selectedOrg: null, editOrg: null })}
            >
              添加部门
            </Button>
            <Button onClick={() => history.push('/qy/txl/org/batch')}>批量导入</Button>
            <Button
              disabled={selectedOrgs.length === 0}
              onClick={() => {
                AlertDialog.show({
                  title: '删除部门',
                  content: `部门删除后不可恢复，是否继续？`,
                  onConfirm: (close) => {
                    service
                      .batchDeleteOrg(
                        selectedOrgs.map((o) => ({
                          id: o.id,
                          status: 'S',
                          // orgCustId: orgInfo.orgCustId,
                        }))
                      )
                      .then(() => {
                        showSuccess('删除成功');
                        refresh();
                        updateStore({ selectedOrgs: [] });
                        close();
                      })
                      .catch(close);
                  },
                  confirmText: '删除',
                  cancelText: '取消',
                  onCancel: (close) => close(),
                });
              }}
            >
              批量删除
            </Button>
          </Space>
        )}
      </div>

      <Table
        columns={columns}
        // childrenColumnName="childs"
        {...tableProps}
        loading={loading}
        rowKey="id"
        pagination={false}
        expandable={{
          childrenColumnName: 'childs',
          // expandedRowRender: (record) => <span>{record.description}</span>,
          expandIcon: ({ expanded, onExpand, record }) => {
            if (!record.childs) {
              return null;
            }
            return expanded ? (
              <Icon
                type="icon-xiangxia"
                style={{ color: '#8C8C8C', marginRight: 4, cursor: 'pointer' }}
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <Icon
                type="icon-xiangyou"
                style={{ color: '#8C8C8C', marginRight: 4, cursor: 'pointer' }}
                onClick={(e) => onExpand(record, e)}
              />
            );
          },
        }}
        style={{ marginTop: 16 }}
        // rowSelection={{ type: 'checkbox', ...rowSelection }}
      />

      {/* add/edit org */}
      <Dialog
        visible={orgId !== -1}
        onClose={() => updateStore({ orgId: -1 })}
        style={{ width: 600 }}
        title={
          <Space>
            <span>{orgId === 0 ? '添加' : '编辑'}部门</span>
            {selectedOrg && (
              <span style={{ color: '#8C8C8C', fontWeight: 'normal' }}>
                (部门ID{selectedOrg.id})
              </span>
            )}
          </Space>
        }
        footer={
          <Space size={16}>
            <Button
              type="default"
              htmlType="reset"
              onClick={() => {
                updateStore({ selectedOrg: null, submitting: false, orgId: -1 });
              }}
            >
              取消
            </Button>
            <Button type="primary" onClick={() => orgForm.submit()} loading={submitting}>
              保存
            </Button>
          </Space>
        }
      >
        <Form
          form={orgForm}
          layout="vertical"
          onFinish={(values) => {
            const isAdd = orgId === 0;
            const data = { ...values, departmentType: 'D' };
            if (!isAdd) {
              data.id = editOrg.id;
              data.departmentType = editOrg.departmentType;
            } else {
              if (!data.parentId) {
                // root
                data.parentId = -1;
              }
            }
            service[isAdd ? 'addOrg' : 'updateOrg'](data).then(() => {
              showSuccess(`${isAdd ? '添加' : '更新'}成功`);
              orgForm.resetFields();
              updateStore({ orgId: -1 });
              refresh();
            });
          }}
        >
          <FormRenderer layoutData={addEditLayout} />
        </Form>
      </Dialog>
    </StyledWrap>
  );
}
