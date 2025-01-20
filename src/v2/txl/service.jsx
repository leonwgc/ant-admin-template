import { get, post, del } from '../../utils/req';

// 员工标签
export const getTagList = (data = {}) => {
  return post('/api/customer/v1/cust/org/label/list', data);
};

// 新增标签员工
export const batchAddTagPeople = (dataArr = []) => {
  return post('/api/customer/v1/cust/org/label/detail/batch/create', dataArr);
};

// 删除标签员工
export const batchRemoveTagPeople = (custIds = [], labelId) => {
  return del(
    `/api/customer/v1/cust/org/label/detail/delete/${labelId}`,
    custIds
  );
};

// work
export const getWorkPlace = (data = { addrType: 'W' }) => {
  return post(`/api/customer/v2/address/list`, data);
};

// company
export const getAllCompanies = () => {
  return get('/api/customer/v2/org/queryOrgWithSub');
};

// 自定义登录名后缀
export const getLoginNameSuffix = () => {
  return get(`/api/customer/v2/profile/org/cfg/LOGIN_NAME_SUFFIX?json=Y`);
};

// 部门
export const getOrgs = () => {
  return get('/api/customer/v2/department/tree?status=A');
};

export const getOrgList = (data) => {
  return post(`/api/customer/v2/department/list`, data);
};

// 新增部门: https://www.yuque.com/books/share/dc2f02ba-1576-4b06-8e31-77c8ca2e7d76/spuko2
export const addOrg = (data) => {
  return post(`/api/customer/v2/department/create`, data);
};

export const updateOrg = (data) => {
  return post(`/api/customer/v2/department/update`, data);
};

export const batchDeleteOrg = (dataArr = []) => {
  return post(`/api/customer/v2/department/batch/update`, dataArr);
};

// 查询当前公司部门树
export const getDeptTreeByOrgCustId = (orgCustId) => {
  return get(
    `/api/customer/v2/department/departmentTreeCurOrg?orgCustId=${orgCustId}&status=A`
  );
};

// 查询集团部门树（含人数统计）
export const getDeptTree = () => {
  return get(`/api/customer/v2/department/tree?status=A`);
};

// people

//导出员工,请求参数（同员工列表接口）
export const batchExportPeople = (data) => {
  return post(`/api/website/v1/export/simple/staff`, data);
};

/** 批量离职 */
export const batchLizhiPeole = (dataArr = []) => {
  return post(`/api/customer/v5/simple/staff/batch/update`, dataArr);
};

export const deletePeopel = (id) => {
  return del(`/api/customer/v5/simple/staff/delete/${id}`);
};

// 获取人员列表, 在职 employeeStatusSet: ['N', 'S'], 离职:  employeeStatusSet: ['D'],
export const getPeopleList = (data) => {
  return post(`/api/customer/v5/simple/staff/page/list`, data);
};

export const getPeopleDetailById = (id) => {
  return get(`/api/customer/v5/simple/staff/get/${id}`);
};
