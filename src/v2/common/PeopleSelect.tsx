import React, { useState, useRef } from 'react';
import { Spin, Select } from 'antd';
import { useDebounce, useUpdateEffect, useMount } from 'react-uni-comps';
import { post } from 'src/utils/req';
import { getOptions } from 'src/utils/helper';

/**
 * 下拉搜索选人
 *
 * @param {*} props
 * @return {*}
 */
function PeopleSelect(props) {
  const [val, setVal] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(0);

  const doSearch = useDebounce((v, ids: any = []) => {
    if (v || ids.length > 0) {
      setLoading(true);
      ref.current++;
      const fetchId = ref.current;
      const data: any = {
        rowNo: 10,
        employeeStatusSet: ['N', 'S'],
      };
      if (v) {
        data.nameLike = v;
      } else {
        data.staffCustIds = ids;
      }
      return post('/api/customer/v5/simple/staff/list', data)
        .then((res: any) => {
          if (fetchId === ref.current) {
            setOptions(getOptions(res.result || [], 'name', 'staffCustId'));
            setLoading(false);
          } else {
            // ignored
          }
        })
        .catch(() => setLoading(false));
    }
  }, 200);

  useUpdateEffect(() => {
    const v = val.trim();
    if (v) {
      doSearch(v);
    } else {
      setLoading(false);
      setOptions([]);
    }
  }, [val]);

  useMount(() => {
    if (props.value) {
      if (
        (typeof props.value === 'string' && props.value.trim() !== '') ||
        typeof props.value === 'number'
      ) {
        doSearch(null, [props.value]);
      } else if (Array.isArray(props.value) && props.value.length > 0) {
        doSearch(null, props.value);
      }
    }
  });

  return (
    <Select
      filterOption={false}
      showSearch
      onSearch={setVal}
      notFoundContent={loading ? <Spin size="small" /> : null}
      placeholder="输入名字搜索"
      allowClear
      {...props}
      options={options}
    />
  );
}

export default React.memo(PeopleSelect);
