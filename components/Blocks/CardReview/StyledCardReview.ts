import StarRatings from 'react-star-ratings';
import styled from 'styled-components';

export const StyledCardReview = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.grey};
  color: ${({ theme }) => theme.colors.fontColor};
`;

export const StyledCardAuthorWrapper = styled.div`
  display: flex;
  padding: 18px 20px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const StyledCardAuthor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledAuthorName = styled.h3`
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
`;

export const StyledAuthorPhoto = styled.div`
  margin-right: 20px;
`;

export const StyledStars = styled(StarRatings)``;

export const StyledCardText = styled.div`
  padding: 30px;
  border-top: none;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const StyledCardMessage = styled.p`
  margin-bottom: 40px;
`;

export const StyledCardDate = styled.p``;
