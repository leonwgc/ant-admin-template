import React, { useState, useRef, useCallback } from 'react';
import { Tree, Spin } from 'antd';
import {
  Input,
  Icon,
  styled,
  useUpdateEffect,
  Button,
  Space,
  useMount,
  Text,
  Tooltip,
  uniqArray,
  flatArray,
} from 'react-uni-comps';
import Dialog from 'src/common/Dialog';
import { get } from 'src/utils/req';
import { getHighlightText } from './utils';

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
  width: 736px;
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
  .tip {
    margin: 12px 0;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #8c8c8c;
    line-height: 17px;
  }
  .h {
    overflow-y: scroll;
    height: 380px;

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

const StyledInput = styled(Input)`
  margin-bottom: 18px;
  &:hover {
    box-shadow: 0 0 0 2px rgb(0 75 204 / 20%);
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 16px;
  color: #8c8c8c;
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
  value?: string[];
  /** 关闭弹框 */
  onClose: () => void;
  /** 点击确定回调 */
  onConfirm?: (values: string[], items: Object[]) => void;
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
    onConfirm, // 点击确定回调
    ...restProps
  } = props;

  const [val, setVal] = useState(value || []); // as checkedKeys

  const [searchVal, setSearchVal] = useState('');
  const [loading, setLoading] = useState(true);

  // tree data
  const flatRef = useRef([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [expandedKeys, setExpandedKeys] = useState([]);

  const shouldExpandRef = useRef([]);

  useMount(() => {
    get(api).then(({ result = [] }) => {
      flatRef.current = flatArray(result, 'childs');

      setData(result);
      setFilteredData(result);
      setLoading(false);
    });
  });

  const filter = useCallback((data, val = '') => {
    if (!val) return data;
    function contains(item, val = '') {
      let r = false;
      if (item[fieldNames.title].indexOf(val) > -1) {
        if (item.parentId != -1) {
          shouldExpandRef.current.push(item.parentId);
        }
        r = true;
      }

      if (!r) {
        r =
          Array.isArray(item[fieldNames.children]) &&
          item[fieldNames.children].some((e) => contains(e, val));

        if (r) {
          shouldExpandRef.current.push(item[fieldNames.key]);
        }
      }

      return r;
    }

    return data.filter((d) => contains(d, val));
  }, []);

  const selectedItemList = flatRef.current.filter((d) => val.includes(d[fieldNames.key]));

  // search
  useUpdateEffect(() => {
    const v = searchVal.trim();
    if (v) {
      setFilteredData(filter(data, v));

      setExpandedKeys((k) => uniqArray(k.concat(shouldExpandRef.current), (a, b) => a === b));
    } else {
      setFilteredData(data);
    }
  }, [searchVal]);

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
            marginTop: 32,
            alignItems: 'center',
          }}
          size={16}
        >
          <Button type="default" style={{ width: 80 }} onClick={onClose}>
            取消
          </Button>
          <Button
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
      <Spin spinning={loading}>
        <StyledWrap>
          <div className="left">
            <StyledInput
              ime
              placeholder="搜索部门名称"
              prefix={<StyledIcon type="icon-sousuo" />}
              clearable
              value={searchVal}
              onChange={setSearchVal}
            />

            {searchVal.length > 0 && <div className="tip">包含“{searchVal}”的搜索结果</div>}

            <div className="h">
              <Tree
                treeData={filteredData}
                checkable
                checkStrictly
                checkedKeys={val}
                selectable={false}
                titleRender={(nodeData) => {
                  const s = searchVal.trim();
                  const titleText = nodeData[fieldNames.title];
                  let titleNode = titleText;

                  if (s.length > 0 && nodeData[fieldNames.title].indexOf(s) > -1) {
                    titleNode = getHighlightText(nodeData[fieldNames.title], s);
                  }

                  return (
                    <Text style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <StyledCircle>
                        <Icon type="icon-bumen" style={{ color: '#fff' }} />
                      </StyledCircle>
                      {titleText.length > 15 ? (
                        <Tooltip title={titleText} placement="bottom">
                          {titleNode}
                        </Tooltip>
                      ) : (
                        titleNode
                      )}
                    </Text>
                  );
                }}
                autoExpandParent
                expandedKeys={expandedKeys}
                onExpand={(_expandedKeys, { expanded, node }: any) => {
                  setExpandedKeys(_expandedKeys);
                }}
                fieldNames={fieldNames}
                onCheck={(c: any, { checked, node }: any) => {
                  if (multiple) {
                    setVal(c.checked);
                  } else {
                    if (checked) {
                      setVal([node[fieldNames.key]]);
                    } else {
                      setVal([]);
                    }
                  }
                }}
                {...restProps}
              />
            </div>
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

                        <Icon
                          type="icon-lajitong"
                          style={{ fontSize: 16, color: '#8c8c8c', cursor: 'pointer' }}
                          onClick={() => {
                            setVal(val.filter((k) => k != o[fieldNames.key]));
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
      </Spin>
    </Dialog>
  );
}

export default React.memo(OrgDialogSelect);
