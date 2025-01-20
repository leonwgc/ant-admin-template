//#region  style & libs

import React from 'react';
import { styled } from 'react-uni-comps';
import usePageTitle from 'src/hooks/usePageTitle';
import LeftOrgSelect from './LeftOrgSelect';
import PeopleList from './PeopleList';

const StyledWrap = styled.div`
  display: flex;
`;

//#endregion style & libs

export default function Forget({ history }) {
  usePageTitle('人员通讯录');

  return (
    <StyledWrap>
      <LeftOrgSelect />
      <PeopleList />
    </StyledWrap>
  );
}
