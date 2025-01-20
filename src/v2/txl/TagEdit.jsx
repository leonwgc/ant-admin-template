import React, { useCallback } from 'react';
import {
  Input,
  Icon,
  styled,
  Button,
  clsx,
  Space,
  useUpdateEffect,
  AlertDialog,
  PopMenu,
  useMount,
} from 'react-uni-comps';
import { Menu, Form } from 'antd';
import { getThemeColorCss } from 'react-uni-comps/es/themeHelper';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import FormRenderer from 'antd-form-render';
import { post, del } from 'src/utils/req';
import { useUnmount } from 'ahooks';
import Dialog from 'src/common/Dialog';
import { showSuccess } from 'src/common/msg';
import * as service from './service';

//#region  style & other

const StyledWrap = styled.div`
  width: 225px;
  min-height: calc(100vh - 76px);
  border-right: 1px solid #dcdee0;
  background-color: #fff;
  padding: 16px;

  .list {
    .item {
      width: 193px;
      height: 48px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.active,
      &:hover {
        ${getThemeColorCss('color')}
      }
    }
  }

  .uc-icon {
    font-size: 16px;
    color: #8c8c8c;
  }
`;

//#endregion

// store

function TagEdit(props) {
  const updateStore = useUpdateStore();
  // tagId:  -1 closed, 0 means add
  const {
    tagList = [],
    tagId = -1,
    selectedTag, //used for global
    editTag, // used for edit
  } = useAppData(({ app }) => app);

  const getTagList = useCallback(
    () =>
      service.getTagList().then(({ result = [] }) =>
        updateStore({
          tagList: result,
          selectedTag: result.length > 0 ? result[0] : null,
        })
      ),
    [updateStore]
  );

  // add/edit
  const [form] = Form.useForm();

  useMount(() => {
    getTagList();
  });

  useUnmount(() => {
    updateStore({
      tagList: undefined,
      selectedTag: undefined,
      tagId: undefined,
      editTag: undefined,
    });
  });

  useUpdateEffect(() => {
    form.resetFields();
  }, [editTag]);

  //#region  add/edit
  const addeditLayout = [
    {
      type: Input,
      label: '标签名称',
      name: 'name',
      elProps: {
        maxLength: 20,
        placeholder: '请输入标签名称（20字以内）',
      },
      itemProps: {
        initialValue: editTag?.name,
        rules: [
          {
            required: true,
            message: '请输入',
          },
        ],
      },
    },

    {
      type: Input,
      label: '标签描述',
      name: 'description',
      elProps: {
        textarea: true,
        maxLength: 100,
        rows: 4,
        placeholder: '请输入对标签的描述（100字以内）',
      },
      itemProps: {
        initialValue: editTag?.description,
      },
    },
  ];
  //#endregion

  return (
    <StyledWrap>
      <Button
        block
        style={{ marginBottom: 16 }}
        onClick={() => updateStore({ tagId: 0, editTag: null })}
      >
        <Space>
          <Icon type="uc-icon-jia2" style={{ verticalAlign: -3 }} /> 新增员工标签
        </Space>
      </Button>

      <div className="list">
        {tagList.map((item) => (
          <div
            className={clsx('item', {
              active: selectedTag?.id === item.id,
            })}
            onClick={() => updateStore({ selectedTag: item })}
            key={item.id}
          >
            {item.name}

            <PopMenu
              content={
                <Menu
                  style={{
                    width: 62,
                    border: '1px solid #EBEBEB',
                    textAlign: 'center',
                  }}
                >
                  <Menu.Item
                    onClick={() => {
                      updateStore({ tagId: item.id, editTag: item });
                    }}
                  >
                    编辑
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      AlertDialog.show({
                        title: '删除标签',
                        wait: true,
                        content: `仅支持删除没有成员的标签，请先移除标签下的成员`,
                        onConfirm: (close) => {
                          del(`/api/customer/v1/cust/org/label/delete/${item.id}`).then(() => {
                            showSuccess('删除成功');
                            getTagList().then((res) => updateStore({ selectedTag: res[0] || {} }));

                            setTimeout(() => {
                              close();
                            }, 500);
                          });
                        },
                        confirmText: '删除',
                        cancelText: '取消',
                        onCancel: (close) => close(),
                      });
                    }}
                  >
                    删除
                  </Menu.Item>
                </Menu>
              }
              trigger="hover"
            >
              <Icon
                type="icon-gengduo"
                onClickCapture={(e) => {
                  e.stopPropagation();
                }}
              />
            </PopMenu>
          </div>
        ))}
      </div>
      {/* add/edit org */}
      <Dialog
        visible={tagId !== -1}
        onClose={() => {
          updateStore({ tagId: -1 });
        }}
        style={{ width: 600 }}
        title={
          <Space>
            <span>{tagId === 0 ? '添加' : '编辑'}员工标签</span>
            {editTag && (
              <span style={{ color: '#8C8C8C', fontWeight: 'normal' }}>标签ID: {editTag?.id}</span>
            )}
          </Space>
        }
        footer={
          <Space size={16} style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button
              type="default"
              htmlType="reset"
              onClick={() => {
                form.resetFields();
                updateStore({ editTag: null, submitting: false, tagId: -1 });
              }}
            >
              取消
            </Button>
            <Button type="primary" onClick={() => form.submit()} wait>
              确认
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            // updateStore({ submitting: true });
            const fn = () =>
              editTag
                ? post('/api/customer/v1/cust/org/label/update', { ...values, id: editTag.id })
                : post('/api/customer/v1/cust/org/label/create', values);

            fn().then(() => {
              form.resetFields();
              updateStore({
                tagId: -1,
              });
              getTagList();
              showSuccess(`${editTag ? '修改' : '添加'}成功`);
            });
          }}
        >
          <FormRenderer layoutData={addeditLayout} />
        </Form>
      </Dialog>
    </StyledWrap>
  );
}

export default TagEdit;
