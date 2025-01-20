import { styled } from 'react-uni-comps';

export const StyledAdminWrapper = styled.div`
  max-height: calc(100vh - 60px);
  overflow-y: scroll;
  flex: 1;
  background: #fff;
`;

export const StyledAdminContentWrapper = styled.div`
  background: #fff;
  min-height: calc(100vh - 180px);
  padding: ${({ padding = 20 }) => padding}px;
  border-radius: 2px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.04);
`;

export const StyledSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
