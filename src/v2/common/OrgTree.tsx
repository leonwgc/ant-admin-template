import React, { useState, useRef } from 'react';
import { Tree, Spin } from 'antd';
import {
  Input,
  Icon,
  styled,
  useUpdateEffect,
  useMount,
  Text,
  Tooltip,
  flatArray,
  useDebounce,
  Space,
} from 'react-uni-comps';
import { get } from 'src/utils/req';
import { OpenData } from 'src/v2/common/Open';

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
  .s {
    .tip {
      margin: 12px 0;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #8c8c8c;
      line-height: 17px;
    }
  }

  .h {
    overflow-y: scroll;
    height: 380px;

    .ant-tree .ant-tree-node-content-wrapper {
    }

    .anticon {
      color: #8c8c8c;
      font-size: 12px;
    }
  }
`;

const StyledInput = styled(Input)`
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const StyledIcon = styled(Icon)`
  font-size: 16px;
  color: #8c8c8c;
`;

//#endregion

type fieldNamesType = {
  title: string;
  key: string;
  children: string;
};

const _fieldNames: fieldNamesType = {
  title: 'name',
  key: 'id',
  children: 'childs',
};

type Props = {
  /** 接口, 默认： /api/customer/v2/department/tree */
  api?: string;
  /** 是否多选，默认false */
  multiple?: boolean;
  /** 选中的值,不管单选多选都是数组 */
  value?: Array<string | number>;
  /** 父子节点是否关联, 默认false */
  checkStrictly?: boolean;
  /** 节点前添加 Checkbox 复选框, default: false */
  checkable?: boolean;
  /** 是否可选中, default: true */
  selectable?: boolean;
  /** checkbox值改变回调,checkable为true才调用  */
  onChange?: (values: Array<string | number>, items: Array<any>) => void;
  /** 显示搜索, default: false */
  showSearch?: boolean;
  fieldNames?: fieldNamesType;
  placeholder?: string;
  /** input下方内容 */
  extra?: React.ReactNode;
  /** 自定义icon */
  icon?: (data: any) => React.ReactNode;
};

const isEqualArr = (arr1 = [], arr2 = []) => {
  const l1 = arr1.length;
  const l2 = arr2.length;
  if (l1 !== l2) return false;

  for (let i1 of arr1) {
    if (!arr2.includes(i1)) {
      return false;
    }
  }

  return true;
};

const defaultIconFunc = () => (
  <StyledCircle>
    <Icon type="icon-bumen" style={{ color: '#fff' }} />
  </StyledCircle>
);

/**
 *  部门树,支持多选，单选，select,checkbox模式
 *
 * @param {Props} props
 * @return {*}
 */
function OrgTree(props: Props) {
  const {
    api = `/api/customer/v2/department/tree`,
    multiple,
    value = [],
    checkStrictly,
    selectable = true,
    onChange,
    fieldNames = _fieldNames,
    placeholder = '搜索部门名称',
    checkable,
    showSearch,
    extra,
    icon = defaultIconFunc,
    ...restProps
  } = props;

  const [val, setVal] = useState(value || []); // as checkedKeys

  const [searchVal, setSearchVal] = useState('');
  const [loading, setLoading] = useState(true);

  const initDataRef = useRef<Array<any>>();

  // tree data
  const flatRef = useRef<Array<any>>([]);
  const [data, setData] = useState([]); // all data

  const ref = useRef(0);

  const doSearch = useDebounce((searchText) => {
    if (searchText) {
      setLoading(true);
      ref.current++;
      const fetchId = ref.current;

      return get(api, { name: searchText, status: 'A' })
        .then(({ result = [] }) => {
          if (fetchId === ref.current) {
            setData(result);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
  }, 200);

  useMount(() => {
    setLoading(true);
    get(api, { status: 'A' })
      .then(({ result = [] }) => {
        flatRef.current = flatArray(result, 'childs');

        setData(result);
        initDataRef.current = result;

        setLoading(false);
      })
      .catch(() => setLoading(false));
  });

  // useUpdateEffect(() => {
  //   const v = searchVal.trim();
  //   if (v) {
  //     doSearch(v);
  //   } else {
  //     setLoading(false);
  //     setData(initDataRef.current || []);
  //   }
  // }, [searchVal]);

  useUpdateEffect(() => {
    const v = searchVal.trim();
    if (!v) {
      setData(initDataRef.current || []);
    }
  }, [searchVal]);

  // sync value outside
  useUpdateEffect(() => {
    if (!isEqualArr(value, val)) {
      setVal(value);
    }
  }, [value]);

  useUpdateEffect(() => {
    onChange?.(
      val,
      flatRef.current.filter((d) => val.includes(d[fieldNames.key]))
    );
  }, [val]);

  return (
    <Spin spinning={loading}>
      <StyledWrap>
        {showSearch && (
          <div className="s">
            <StyledInput
              ime
              placeholder={placeholder}
              prefix={<StyledIcon type="icon-sousuo" />}
              clearable
              value={searchVal}
              onKeyUp={(e) => {
                if (e.which === 13) {
                  const s = searchVal.trim();
                  if (!s) {
                    setData(initDataRef.current || []);
                  } else {
                    doSearch(s);
                  }
                }
              }}
              onChange={setSearchVal}
            />

            {extra}
          </div>
        )}

        <div className="h">
          <Tree
            treeData={data}
            checkable={checkable}
            checkStrictly={checkStrictly}
            checkedKeys={val}
            selectable={selectable}
            titleRender={(nodeData) => {
              const titleText = nodeData[fieldNames.title];
              // let titleNode = titleText;

              // return (
              //   <Text style={{ display: 'inline-flex', alignItems: 'center' }}>
              //     <Space>
              //       {icon(nodeData)}
              //       {titleText.length > 15 ? (
              //         <Tooltip title={titleText} placement="bottom-left">
              //           {titleNode}
              //         </Tooltip>
              //       ) : (
              //         titleNode
              //       )}
              //     </Space>
              //   </Text>
              // );
              return (
                <Space style={{ alignItems: 'center' }}>
                  {icon(nodeData)}
                  <OpenData openType="deptName" openId={titleText}></OpenData>
                </Space>
              );
            }}
            fieldNames={fieldNames}
            onCheck={(c: any, { checked, node }: any) => {
              if (checkStrictly) {
                if (multiple) {
                  setVal(c.checked);
                } else {
                  if (checked) {
                    setVal([node[fieldNames.key]]);
                  } else {
                    setVal([]);
                  }
                }
              } else {
                setVal(c);
              }
            }}
            {...restProps}
          />
        </div>
      </StyledWrap>
    </Spin>
  );
}

export default React.memo(OrgTree);
