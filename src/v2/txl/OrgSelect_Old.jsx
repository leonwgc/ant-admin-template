import React, { useState, useEffect, useRef } from 'react';
import { Tree } from 'antd';
import { Input, Icon, styled, Avatar, useUnmount } from 'react-uni-comps';
import { getThemeColorCss } from 'react-uni-comps/es/themeHelper';
import { useAppData, useUpdateStore } from 'simple-redux-store';
import { get } from 'src/utils/req';

//#region  style & other

const StyledWrap = styled.div`
  width: 225px;
  min-height: calc(100vh - 76px);
  border-right: 1px solid #dcdee0;
  background-color: #fff;
  padding: 20px;

  .uc-input {
    margin-bottom: 20px;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .company {
    margin-bottom: 10px;
    ${getThemeColorCss('color')}
    user-select: none;
    cursor: pointer;

    .uc-avatar {
      ${getThemeColorCss('background-color')}
      color: #fff;
      border-radius: 2px;
      margin-right: 10px;
    }
  }

  .ant-tree-list {
    svg {
      color: #8c8c8c;
    }
  }

  .uc-icon {
    font-size: 16px;
    color: #8c8c8c;
  }
`;

function flat(dataArr, flatArr = []) {
  for (let item of dataArr) {
    item.title = (
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Icon type="zfl-icon-xiaji_line" style={{ color: '#fff', marginRight: 8 }} />
        {item.name}
      </span>
    );
    item.key = item.id;
    flatArr.push(item);

    if (Array.isArray(item.childs)) {
      item.children = flat(item.childs, flatArr);
    }
  }
  return dataArr;
}

const filter = (data, val = '') => {
  if (!val) return data;
  return data.filter((item) => item.name.indexOf(val) > -1);
};

//#endregion

// store: selectedOrg

function OrgSelect(props) {
  const { orgInfo = {} } = useAppData(({ app }) => app);
  const updateStore = useUpdateStore();

  const [val, setVal] = useState('');
  const [data, setData] = useState([]);
  const flatRef = useRef([]);

  useUnmount(() => {
    updateStore({
      selectedOrg: null,
    });
  });

  useEffect(() => {
    if (orgInfo?.custId) {
      get(`/api/customer/v2/department/departmentTreeCurOrg?orgCustId=${orgInfo.custId}`).then(
        ({ result = [] }) => {
          const flatArr = [];
          flat(result, flatArr);
          flatRef.current = flatArr;

          setData(result);
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgInfo]);

  return (
    <StyledWrap>
      <Input
        ime
        placeholder="搜索部门名称"
        clearable
        prefix={<Icon type="uc-icon-sousuo" />}
        value={val}
        onChange={setVal}
      />

      <div className="company" onClick={() => updateStore({ selectedOrg: null })}>
        <Avatar size={22}>{orgInfo?.name?.[0]}</Avatar>
        <span className="name">{orgInfo.name}</span>
      </div>

      <Tree
        {...props}
        treeData={filter(data, val)}
        checkStrictly
        autoExpandParent
        onSelect={(keys, e) => {
          if (e.selected) {
            updateStore({
              selectedOrg: { name: e.selectedNodes[0].name, id: e.selectedNodes[0].id },
            });
          } else {
            updateStore({
              selectedOrg: null,
            });
          }
        }}
      />
    </StyledWrap>
  );
}

export default OrgSelect;
