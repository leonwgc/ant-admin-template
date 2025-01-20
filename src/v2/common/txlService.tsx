import { post } from 'src/utils/req';

export const getOrgList = (data = {}) => {
  return post(`/api/customer/v2/department/list`, data);
};

export const getPeopleList = (data) => {
  return post(`/api/customer/v5/simple/staff/page/list`, data);
};
