import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';
import { IServiceProps } from './IService';
import {
  StyledService,
  StyledServiceBtn,
  StyledServiceBtns,
} from './StyledService';

const Service: FC<IServiceProps> = ({ service, onClick }) => {
  return (
    <StyledService onClick={onClick}>
      {service.name}
      <StyledServiceBtns>
        <StyledServiceBtn icon={faPen as IconProp} />
        <StyledServiceBtn icon={faTrash as IconProp} />
      </StyledServiceBtns>
    </StyledService>
  );
};

export default Service;
