import styled from 'styled-components';

export const StyledServices = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    align-items: center;

    button {
      margin: 20px auto;
    }
  }
`;

export const StyledServicesWrapper = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;
