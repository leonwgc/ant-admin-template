import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import { get } from 'src/utils/req';

type Props = {
  // 子公司id;
  orgCustId: string;
  /** 使用集团接口: /api/customer/v2/department/tree */
  useGroupApi?: boolean;
};

const defaultFieldNames = {
  label: 'name',
  value: 'id',
  children: 'childs',
};

/**
 *  下拉树选择部门
 *
 * @param {*} props
 * @return {*}
 */
function OrgTreeSelect(props: Props) {
  const { orgCustId = '', useGroupApi = false, ...rest } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (useGroupApi) {
      get(`/api/customer/v2/department/tree?status=A`).then(({ result = [] }) => {
        setData(result);
      });
    } else if (orgCustId) {
      get(`/api/customer/v2/department/departmentTreeCurOrg?orgCustId=${orgCustId}&status=A`).then(
        ({ result = [] }) => {
          setData(result);
        }
      );
    } else {
      setData([]);
    }
  }, [orgCustId, useGroupApi]);

  return (
    <TreeSelect
      treeData={data}
      treeNodeFilterProp="name"
      showSearch
      fieldNames={defaultFieldNames}
      {...rest}
    />
  );
}

export default OrgTreeSelect;
