//#region  import & style
import React, { useState } from 'react';
import { Form, Table } from 'antd';
import { Button, Space, Icon, Input, useUpdateEffect, useUnmount } from 'antd';
import dayjs from 'dayjs';
import { post } from 'src/utils/req';
import { useAntdTable } from 'ahooks';
import { FormSpaceRender } from 'antd-form-render';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import { OpenData } from 'src/v2/common/Open';
import { displayDateFormat } from 'src/utils/helper';

const StyledWrap = styled.div`
  background: #fff;
  position: relative;
  padding: 24px 20px;
  flex: 1;

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
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
  }
`;

//#endregion

export default function LeaveList(props) {
  const {
    selectedOrg,
    orgInfo = {},
    selectedLeavePeople = [],
  } = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();
  const [form] = Form.useForm();
  const [count, setCount] = useState(0);

  // add/edit
  const [pId, setPId] = useState(0); // -1 means add

  useUnmount(() => {
    updateStore({ selectedLeavePeople: undefined });
  });

  const getTableData = ({ current = 1, pageSize }, formData) => {
    const param = {
      employeeStatusSet: ['D'],
      ...formData,
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

  const layoutData = [
    {
      type: Input,
      label: '',
      placeholder: '搜索姓名/手机号',
      name: 'phoneOrNameLike',
      elProps: {
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
        children: '查询',
        type: 'primary',
        style: { width: 80 },
        onClick: submit,
      },
    },
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
      title: '离职日期',
      dataIndex: 'resignDate',
      render: (text) => {
        return dayjs(text).format(displayDateFormat);
      },
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      render: (text) => {
        return <OpenData openType="deptName" openId={text}></OpenData>;
      },
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   render: (text, record) => {
    //     return (
    //       <Button
    //         as="a"
    //         danger
    //         onClick={() =>
    //           AlertDialog.show({
    //             title: '删除',
    //             content: '删除后，员工信息将无法恢复，请谨慎操作',
    //             onConfirm: (close) => {
    //               service.deletePeopel(record.id).then(() => {
    //                 showSuccess('删除成功');
    //                 refresh();
    //               });
    //               close();
    //             },
    //             confirmText: '删除',
    //             cancelText: '取消',
    //             onCancel: (close) => {
    //               close();
    //             },
    //           })
    //         }
    //       >
    //         删除
    //       </Button>
    //     );
    //   },
    // },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      updateStore({ selectedLeavePeople: selectedRows });
    },
    onSelect: (record, selected, selectedRows) => {
      updateStore({ selectedLeavePeople: selectedRows });
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      updateStore({ selectedLeavePeople: selectedRows });
    },
  };

  //#endregion

  return (
    <StyledWrap>
      <div className="top">
        <div className="name">已离职员工({count}人)</div>
      </div>
      <div className="head">
        <Form form={form} onFinish={search} style={{ marginBottom: 16 }}>
          <FormSpaceRender
            layoutData={layoutData}
            size={16}
            wrap
            style={{ position: 'relative', width: '100%' }}
          />
        </Form>
        <Space size={16}>
          {/* <Button
            disabled={selectedLeavePeople.length === 0}
            onClick={() =>
              AlertDialog.show({
                title: '批量删除',
                content: `确定要删除 ${selectedLeavePeople.length} 条离职记录吗？
                删除后，员工信息将无法恢复，请谨慎操作`,
                onConfirm: (close) => {
                  close();
                },
                confirmText: '删除',
                cancelText: '取消',
                onCancel: (close) => {
                  close();
                },
              })
            }
          >
            批量删除
          </Button> */}
          {/* <Button
            disabled={count === 0}
            onClick={() =>
              AlertDialog.show({
                title: '清空列表',
                content: `清空后离职记录将无法恢复，请谨慎操作`,
                onConfirm: (close) => {
                  close();
                },
                confirmText: '清空',
                cancelText: '取消',
                onCancel: (close) => {
                  close();
                },
              })
            }
          >
            清空
          </Button> */}
        </Space>
      </div>

      <Table
        columns={columns}
        // rowSelection={{ type: 'checkbox', ...rowSelection }}
        {...tableProps}
        loading={loading}
        rowKey="id"
        style={{ marginTop: 16 }}
      />
    </StyledWrap>
  );
}
