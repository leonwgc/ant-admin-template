import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Input,
  Icon,
  styled,
  useUpdateEffect,
  useDebounce,
  Space,
  Button,
  PopMenu,
  IconArrow,
  Waypoint,
  Spin,
  AutoCenter,
  uniqArray,
  Checkbox,
} from 'react-uni-comps';
import Dialog from 'src/common/Dialog';
import { Empty } from 'antd';
import * as txlService from './txlService';

// 请选择部门/员工 , not tree structure

// 用于钉钉，企业微信等加密平台， 过滤等需要完全调后端接口实现

//#region  style & other

export const StyledCircle = styled.div`
  width: 32px;
  height: 32px;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #65afff;
  border-radius: 50%;
  opacity: 0.5;
`;

const StyledInput = styled(Input)`
  background: #f5f5f5;
  border-radius: 4px;
  /* margin-bottom: 20px; */
  padding: 0 10px;

  .suffix {
    border-left: 1px solid #e0e0e0;
    /* width: 100px; */
    padding: 6px 0;
    display: inline-flex;
    justify-content: center;
    padding-left: 8px;

    &.clear {
      padding-left: 0;
      width: unset;
      border: none;
    }
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 16px;
  color: #8c8c8c;
`;

//#endregion

//#region  style & other

const StyledWrap = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  user-select: none;

  .ant-checkbox-inner {
    width: 14px;
    height: 14px;
  }

  .left,
  .right {
    flex: 1;
    overflow: hidden;
  }

  .left {
    padding: 16px 16px 0;
    border-right: 1px solid #e0e0e0;
  }

  .s {
    .check-all {
      margin: 8px 0;
    }
  }

  .h {
    overflow-y: scroll;
    height: 350px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1a1a1a;

    .tip {
      color: #8c8c8c;
      font-size: 12px;
    }

    .anticon {
      color: #8c8c8c;
      font-size: 12px;
    }

    .list-item {
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.selected {
        .name {
          color: #1a1a1a;
          line-height: 20px;
        }
        .dept {
          color: #8c8c8c;
          line-height: 17px;
          font-size: 12px;
        }
      }
    }

    &.right {
      height: 420px;
      padding: 0;
    }
  }

  .right {
    padding: 16px 16px 0;
    background: #f5f5f5;
    color: #8c8c8c;

    .title {
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

const StyledList = styled.div`
  background-color: #fff;

  .list-item {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

//#endregion

type Item = {
  id: string | number;
  /** 名称 */
  name: string;
  /** 完整部门/描述 */
  s?: string;
  /** 类型，部门/人员 */
  t: 'S' | 'D'; // S(员工)， D（部门）
};
type Props = {
  /** 弹框标题 */
  title?: React.ReactNode;
  /** 弹框是否可见 */
  visible: boolean;
  /** 选中的值 */
  value?: Array<Item>;
  /** 关闭弹框 */
  onClose: () => void;
  /** 点击确定回调 */
  onConfirm?: (values: Array<Item>) => void;
  showSearch?: boolean;
  /** 只是人员选择 */
  onlyPeople: boolean;
};

const mapList = (list, isOrg) => {
  return list.map((item) => {
    return {
      id: isOrg ? item.id : item.staffCustId,
      name: item.name,
      t: isOrg ? 'D' : 'S',
      s: isOrg ? item.fullName : item.deptName,
    };
  });
};

/**
 *  弹框选择部门
 *
 * @param {Props} props
 * @return {*}
 */
function OrgPeopleDialogSelect(props: Props) {
  const {
    title = '请选择部门/员工',
    visible,
    value = [],
    onClose,
    showSearch,
    onConfirm, // 点击确定回调
    onlyPeople,
  } = props;

  const [type, setType] = useState(0); // 0: org  1: people

  const [navs, setNavs] = useState([{ name: '通讯录', id: -1 }]); // org nav

  const [parentId, setParentId] = useState(-1); // top level

  // input
  const [popVisible, setPopVisible] = useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkedAll, setCheckedAll] = React.useState(false);

  // list
  const [val, setVal] = useState<Array<Item>>(value || []);

  const [searchVal, setSearchVal] = useState('');

  // pullup
  const [peopleList, setPeopleList] = useState([]);
  const pageRef = useRef(1);
  const finishedRef = useRef(false);
  const [loading, setLoading] = useState(false);

  useUpdateEffect(() => {
    setVal(value);
  }, [value]);

  const fetchPeopleList = useCallback((parentId, searchVal?, fetchId?) => {
    if (finishedRef.current) return;
    setLoading(true);

    const param: any = { employeeStatusSet: ['N', 'S'], departmentId: parentId };
    if (searchVal) {
      param.nameLike = searchVal;
      delete param.departmentId;
    }
    txlService
      .getPeopleList({
        currentPage: pageRef.current++,
        pageSize: 10,
        param,
      })
      .then((res) => {
        if (!fetchId || fetchId === ref.current) {
          const list = res.result?.resultList || [];

          if (list.length) {
            setPeopleList((p) => {
              const l = [...p, ...mapList(list, false)];
              if (!oldRef.current.peopleList.length) {
                oldRef.current.peopleList = l;
              }
              return l;
            });
          }

          if (list.length < 10) {
            finishedRef.current = true;
          }
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  // list data

  const [orgList, setOrgList] = useState([]);

  // checkbox

  const onCheckAllChange = (checkedAll) => {
    const all = [].concat(orgList, peopleList, val);
    setVal(checkedAll ? uniqArray(all, (a, b) => a.id === b.id) : []);
    setIndeterminate(false);
    setCheckedAll(checkedAll);
  };

  // search
  const ref = useRef(0);
  const oldRef = useRef({
    orgList: [],
    peopleList: [],
  });

  const doSearch = useDebounce(
    (searchText) => {
      if (searchText) {
        setLoading(true);
        ref.current++;
        const fetchId = ref.current;

        if (type === 0) {
          const param: any = { parentId: parentId };
          if (searchText) {
            param.nameLike = searchText;
            delete param.parentId;
          }

          txlService
            .getOrgList(param)
            .then((res) => {
              if (fetchId === ref.current) {
                setOrgList(mapList(res.result || [], true));
              }
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          fetchPeopleList(parentId, searchText, fetchId);
        }
      }
    },
    300,
    [parentId, type]
  );

  useEffect(() => {
    txlService.getOrgList({ parentId: parentId }).then((res) => {
      const list = mapList(res.result || [], true);
      if (!oldRef.current.orgList.length) {
        oldRef.current.orgList = list;
      }
      setOrgList(list);
    });
    setIndeterminate(false);
    setPeopleList([]);
    pageRef.current = 1;
    finishedRef.current = false;
    fetchPeopleList(parentId);

    setCheckedAll(false);
  }, [parentId, fetchPeopleList]);

  useUpdateEffect(() => {
    const v = searchVal.trim();
    if (v) {
      setPeopleList([]);
      setOrgList([]);
      finishedRef.current = false;
      pageRef.current = 1;
      doSearch(v);
    } else {
      setLoading(false);
      setPeopleList(oldRef.current.peopleList);
      setOrgList(oldRef.current.orgList);
    }
  }, [searchVal]);

  useUpdateEffect(() => {
    if (!val.length) {
      setCheckedAll(false);
      setIndeterminate(false);
    } else {
      if (!checkedAll) {
        setIndeterminate(true);
      }
    }
  }, [val]);

  const isSelectOrg = type === 0;

  const isSearching = searchVal.trim().length > 0;
  const hasData = peopleList.length || orgList.length;

  // nav render
  const renderNavs = () => {
    const last = navs.length - 1;
    return (
      <Space
        wrap
        size={4}
        style={{ color: '#8C8C8C', margin: '6px 0', fontSize: 12, lineHeight: '20px' }}
        split={'/'}
      >
        {navs.map((item, idx) => {
          if (last === idx) {
            return (
              <Button as="a" style={{ fontSize: 12, color: '#8C8C8C' }}>
                {item.name}
              </Button>
            );
          } else {
            return (
              <Button
                as="a"
                style={{ fontSize: 12 }}
                onClick={() => {
                  const n = navs.slice(0, idx + 1);
                  setNavs([...n]);
                  setParentId(n[n.length - 1].id);
                }}
              >
                {item.name}
              </Button>
            );
          }
        })}
      </Space>
    );
  };

  /**
   *  org / people item render
   *
   * @param {*} [list=[]]
   * @param {boolean} [isOrg=true]
   * @return {*}
   */
  const renderItemList = (list = [], isOrg = true) => {
    return list.map((item) => {
      return (
        <div className="list-item" key={item.id}>
          <Checkbox
            size={16}
            checked={!!val.find((i) => i.id === item.id)}
            onChange={(checked) => {
              if (!checked) {
                setVal((d) => d.filter((v) => v.id !== item.id));

                if (!indeterminate) {
                  setIndeterminate(true);
                }
              } else {
                setVal((d) => [...d, item]);
              }
            }}
            disabled={isOrg && onlyPeople}
          >
            <Space>
              <StyledCircle
                style={{ backgroundColor: isOrg ? '#65AFFF' : '#FAB20A', color: '#fff' }}
              >
                <Icon type={isOrg ? 'icon-bumen' : 'icon-yonghu'} />
              </StyledCircle>
              {item.name}
            </Space>
          </Checkbox>

          {isOrg && (
            <Button
              as="a"
              disabled={!!val.find((v) => v.id == item.id)}
              onClick={() => {
                navs.push({ id: item.id, name: item.name });
                setNavs([...navs]);
                setParentId(item.id);
              }}
            >
              <Space>
                <Icon type="icon-xiaji_line1" />
                下级
              </Space>
            </Button>
          )}
        </div>
      );
    });
  };

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title={title}
      style={{ width: 800, zIndex: 2000 }}
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
              onConfirm?.(val);
            }}
          >
            确定
          </Button>
        </Space>
      }
    >
      <StyledWrap>
        <div className="left">
          <div className="s">
            {showSearch && (
              <StyledInput
                ime
                placeholder={`请输入${type === 0 ? '部门' : '人员'}名`}
                prefix={<StyledIcon type="uc-icon-sousuo" />}
                clearable
                value={searchVal}
                checkedKeys={val}
                onChange={setSearchVal}
                suffix={
                  <PopMenu
                    offset={{ x: 10 }}
                    trigger="click"
                    style={{ zIndex: 3000 }}
                    onVisibleChange={setPopVisible}
                    content={
                      <div
                        style={{
                          width: 100,
                          border: '1px solid #E0E0E0',
                          background: '#fff',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          onClick={() => setType(0)}
                          style={{
                            padding: '0 12px',
                            backgroundColor: isSelectOrg ? '#F5F5F5' : '#fff',
                            width: '100%',
                            height: 38,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: !isSelectOrg ? '#1A1A1A' : '#005cff',
                          }}
                        >
                          <span>部门</span>
                          {type === 0 && <Icon type="uc-icon-tick" />}
                        </div>
                        <div
                          onClick={() => setType(1)}
                          style={{
                            padding: '0 12px',
                            backgroundColor: !isSelectOrg ? '#F5F5F5' : '#fff',
                            width: '100%',
                            height: 38,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: isSelectOrg ? '#1A1A1A' : '#005cff',
                          }}
                        >
                          <span>员工</span>
                          {type === 1 && <Icon type="uc-icon-tick" />}
                        </div>
                      </div>
                    }
                  >
                    <span style={{ fontSize: 14, color: '#1A1A1A' }}>
                      <Space size={8}>
                        {type === 0 ? '搜索部门' : '搜索员工'}
                        <IconArrow
                          style={{ fontSize: 12, color: '#8C8C8C' }}
                          direction={!popVisible ? 'bottom' : 'top'}
                        />
                      </Space>
                    </span>
                  </PopMenu>
                }
              />
            )}
            {renderNavs()}

            {!isSearching && !!hasData && (
              <div className="check-all">
                <Checkbox
                  size={16}
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkedAll}
                >
                  全选
                </Checkbox>
              </div>
            )}
          </div>

          <div className="h">
            <StyledList>
              {renderItemList(orgList)}
              {renderItemList(peopleList, false)}
              <Waypoint
                onVisible={() => {
                  if (!finishedRef.current && !searchVal.trim()) {
                    fetchPeopleList(parentId);
                  }
                }}
              />

              <div className="tip">
                {loading && (
                  <AutoCenter>
                    <Spin />
                  </AutoCenter>
                )}
              </div>
            </StyledList>

            {!hasData && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </div>
        </div>
        <div className="right">
          {val.length > 0 && (
            <div>
              <div className="title">
                已选 {val.filter((v) => v.t === 'D').length}个部门{' '}
                {val.filter((v) => v.t === 'S').length}名员工
              </div>
              <div className="h right">
                {val.map((o) => {
                  return (
                    <div className="list-item selected" key={o.id}>
                      <Space>
                        <StyledCircle
                          style={{
                            backgroundColor: o.t === 'D' ? '#65AFFF' : '#FAB20A',
                            color: '#fff',
                          }}
                        >
                          <Icon type={o.t === 'D' ? 'icon-bumen' : 'icon-yonghu'} />
                        </StyledCircle>
                        <div>
                          <div className="name">{o.name}</div>
                          <div className="dept">{o.s}</div>
                        </div>
                      </Space>

                      <Icon
                        type="icon-lajitong"
                        style={{ fontSize: 16, color: '#8c8c8c', cursor: 'pointer' }}
                        onClick={() => {
                          setVal(val.filter((k) => k.id != o.id));
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

export default React.memo(OrgPeopleDialogSelect);
