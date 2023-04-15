export interface IButton {
  text: string;
  type: 'button' | 'submit' | 'reset';
  inline?: boolean;
  center?: boolean;
  onClick?: () => void;
}

export interface IStyledButton {
  inline?: boolean;
  center?: boolean;
  onClick?: () => void;
}