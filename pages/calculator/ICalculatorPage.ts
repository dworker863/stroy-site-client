import { IService } from '../../commonInterfaces/IService';

export interface ICalculatorPage {
  auth: boolean;
  services: IService[];
}

export interface ICalculatorContext {
  serviceButtonHandler: (value: IService) => void;
}