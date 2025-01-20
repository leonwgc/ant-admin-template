//#region  style & libs

import React from 'react';
import { styled } from 'react-uni-comps';
import usePageTitle from 'src/hooks/usePageTitle';
import TagEdit from './TagEdit';
import TagPeopleList from './TagPeopleList';

const StyledWrap = styled.div`
  display: flex;
`;

//#endregion style & libs

export default function Tag({ history }) {
  usePageTitle('员工标签管理');

  return (
    <StyledWrap>
      <TagEdit />
      <TagPeopleList />
    </StyledWrap>
  );
}
