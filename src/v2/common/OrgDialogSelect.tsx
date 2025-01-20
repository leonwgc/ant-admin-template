import React, { useState } from 'react';
import { Icon, styled, Button, Space } from 'react-uni-comps';
import Dialog from 'src/common/Dialog';
import OrgTree from 'src/v2/common/OrgTree';

// 用于钉钉，企业微信等加密平台， 过滤等需要完全调后端接口实现

//#region  style & other

export const StyledCircle = styled.div`
  width: 28px;
  height: 28px;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #004bcc;
  border-radius: 50%;
  margin-right: 8px;
  opacity: 0.5;
`;

const StyledWrap = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  user-select: none;
  .left,
  .right {
    flex: 1;
    overflow: hidden;
  }

  .left {
    padding: 16px 16px 0;
    border-right: 1px solid #e0e0e0;
  }

  .h {
    overflow-y: scroll;
    height: 350px;

    .ant-tree .ant-tree-node-content-wrapper {
      height: 48px;
    }

    .anticon {
      color: #8c8c8c;
      font-size: 12px;
    }
  }

  .right {
    padding: 16px;

    .title {
      color: #1a1a1a;
      margin-bottom: 8px;
    }

    .item {
      height: 48px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

//#endregion

const fieldNames = {
  title: 'name',
  key: 'id',
  children: 'childs',
};

type Props = {
  /** 接口, 默认： /api/customer/v2/department/tree?status=A */
  api?: string;
  /** 是否多选，默认false */
  multiple?: boolean;
  /** 弹框标题 */
  title?: React.ReactNode;
  /** 弹框是否可见 */
  visible: boolean;
  /** 选中的值,不管单选多选都是数组 */
  value?: Array<string | number>;
  /** 关闭弹框 */
  onClose: () => void;
  /** 点击确定回调 */
  onConfirm?: (values: Array<string | number>, items: Object[]) => void;
  /** 父子节点是否关联, 默认false */
  checkStrictly?: boolean;
};
/**
 *  弹框选择部门
 *
 * @param {Props} props
 * @return {*}
 */
function OrgDialogSelect(props: Props) {
  const {
    api = `/api/customer/v2/department/tree?status=A`,
    multiple,
    title = '选择部门',
    visible,
    value = [],
    onClose,
    checkStrictly,
    onConfirm, // 点击确定回调
    ...restProps
  } = props;

  const [val, setVal] = useState<Array<string | number>>(value || []); // as checkedKeys
  const [selectedItemList, setSelectedItemList] = useState([]);

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title={title}
      style={{ width: 800 }}
      footer={
        <Space
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: 17,
            alignItems: 'center',
          }}
          size={16}
        >
          <Button style={{ width: 80 }} onClick={onClose}>
            取消
          </Button>
          <Button
            disabled={val.length === 0}
            type="primary"
            style={{ width: 80 }}
            onClick={() => {
              onConfirm?.(val, selectedItemList);
            }}
          >
            确定
          </Button>
        </Space>
      }
    >
      <StyledWrap>
        <div className="left">
          <OrgTree
            checkable
            selectable={false}
            checkStrictly
            multiple
            showSearch
            value={val}
            onChange={(value, items) => {
              setVal(value);
              setSelectedItemList(items);
            }}
            {...restProps}
          />
        </div>
        <div className="right">
          {selectedItemList.length > 0 && (
            <div>
              <div className="title">已选{selectedItemList.length}个部门：</div>
              <div className="h">
                {selectedItemList.map((o) => {
                  return (
                    <div className="item" key={o[fieldNames.key]}>
                      <div>
                        <StyledCircle>
                          <Icon type="icon-bumen" style={{ color: '#fff' }} />
                        </StyledCircle>
                        <span>{o[fieldNames.title]}</span>
                      </div>

                      {/* checkStrictly 模式才work */}
                      <Icon
                        type="icon-lajitong"
                        style={{ fontSize: 16, color: '#8c8c8c', cursor: 'pointer' }}
                        onClick={() => {
                          setVal(val.filter((k) => k != o.id));
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </StyledWrap>
    </Dialog>
  );
}

export default React.memo(OrgDialogSelect);
