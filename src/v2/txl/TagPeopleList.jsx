//#region  import & style
import React, { useState, useCallback } from 'react';
import { Form, Table } from 'antd';
import { Button, Space, Icon, styled, Input, AlertDialog, useUpdateEffect } from 'react-uni-comps';
import { post, del } from 'src/utils/req';
import { useAntdTable, useUnmount } from 'ahooks';
import { FormSpaceRender } from 'antd-form-render';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import TagAddPeopleDrawer from './TagAddPeopleDrawer';
import { showSuccess } from 'src/common/msg';
import * as service from './service';
import { OpenData } from 'src/v2/common/Open';

const StyledWrap = styled.div`
  background: #fff;
  position: relative;
  padding: 24px 20px;
  flex: 1;

  .ant-form-item {
    margin-bottom: 0;
  }

  .top {
    margin-bottom: 20px;
    .name {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;

      color: #1a1a1a;
    }

    .desc {
      font-weight: 400;
      font-size: 14px;
      line-height: 28px;
      margin: 16px 0 20px;
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

export default function TagPeopleList(props) {
  const { selectedTag, selectedTagPeopleList = [] } = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();
  const [form] = Form.useForm();

  // drawer
  const [v, setV] = useState(false);
  const onClose = useCallback(() => setV(false), []);

  useUnmount(() => {
    updateStore({ selectedTagPeopleList: undefined });
  });

  useUpdateEffect(() => {
    updateStore({ selectedTagPeopleList: undefined });
  }, [selectedTag]);

  const getTableData = ({ current = 1, pageSize }, formData) => {
    const param = {
      ...formData,
    };

    if (selectedTag) {
      param.labelId = selectedTag.id;
    } else {
      return Promise.resolve({
        total: 0,
        list: [],
      });
    }

    return post(`/api/customer/v1/cust/org/label/detail/page/list`, {
      currentPage: current,
      pageSize,
      param,
    }).then((res) => {
      const { result = {} } = res;

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
  }, [selectedTag]);

  //#region  search def

  const layoutData = [
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
        children: '查询',
        outlined: true,
        onClick: submit,
      },
    },
    // {
    //   type: Button,
    //   elProps: {
    //     children: '重置',
    //     onClick: reset,
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
      align: 'center',
      render: (text, record) => {
        return (
          <Button
            as="a"
            danger
            onClick={() => {
              AlertDialog.show({
                title: '删除标签内的员工',
                content: `删除后，此员工将不归属该标签`,
                onConfirm: (close) => {
                  service.batchRemoveTagPeople([record.staffCustId], selectedTag?.id).then(() => {
                    showSuccess('删除成功');
                    close();
                    refresh();
                  });
                },
                confirmText: '删除',
                cancelText: '取消',
                onCancel: (close) => close(),
              });
            }}
          >
            删除
          </Button>
        );
      },
    },
  ];

  //#endregion

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      updateStore({ selectedTagPeopleList: selectedRows });
    },
    onSelect: (record, selected, selectedRows) => {
      updateStore({ selectedTagPeopleList: selectedRows });
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      updateStore({ selectedTagPeopleList: selectedRows });
    },
  };

  return (
    <StyledWrap>
      <div className="top">
        <div className="name">{selectedTag?.name}</div>
        {selectedTag?.description && <div className="desc">{selectedTag?.description}</div>}
      </div>
      <div className="head">
        <Form form={form} onFinish={search} style={{ marginBottom: 16 }} autoComplete="off">
          <FormSpaceRender
            layoutData={layoutData}
            size={16}
            wrap
            style={{ position: 'relative', width: '100%' }}
          />
        </Form>
        <Space size={16} style={{ alignItems: 'flex-start' }}>
          {selectedTag && (
            <Button type="primary" onClick={() => setV(true)}>
              添加员工
            </Button>
          )}

          <Button
            danger
            disabled={selectedTagPeopleList.length === 0}
            onClick={() => {
              AlertDialog.show({
                title: '删除标签内的员工',
                content: `删除后，此员工将不归属该标签`,
                onConfirm: (close) => {
                  service
                    .batchRemoveTagPeople(
                      selectedTagPeopleList.map((item) => item.staffCustId),
                      selectedTag?.id
                    )
                    .then(() => {
                      showSuccess('删除成功');
                      close();
                      refresh();
                    });
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
      </div>

      <Table
        key={selectedTag?.id || 'default'}
        columns={columns}
        {...tableProps}
        loading={loading}
        rowKey="id"
        style={{ marginTop: 16 }}
        rowSelection={{ type: 'checkbox', ...rowSelection }}
      />
      <TagAddPeopleDrawer visible={v} onClose={onClose} onAdded={refresh} />
    </StyledWrap>
  );
}
