import { IService } from '../../../commonInterfaces/IService';

export interface ICartService {
  service: IService;
  cart: { service: string; sum: number }[];
  setCart: (cart: { service: string; sum: number }[]) => void;
}