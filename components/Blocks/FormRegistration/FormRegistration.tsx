import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FC, useState } from 'react';
import {
  TFormRegistrationProps,
  TFormRegistrationValues,
} from './TFormRegistration';
import { StyledLabel } from '../../../commonStyles/StyledLabel';
import { StyledField } from '../../../commonStyles/StyledField';
import { StyledErrorMessage } from '../../../commonStyles/StyledErrorMessage';
import Button from '../../Elements/Button/Button';
import { registration } from '../../../api/api';
import { StyledRedSpan } from '../../../commonStyles/StyledRedSpan';

const FormRegistration: FC<TFormRegistrationProps> = ({
  loginBtnHandler,
  submitHandler,
}) => {
  const [err, setErr] = useState('');

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Введите имя пользователя'),
        password: Yup.string().required('Введите пароль'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password')], 'Пароли не совпадают')
          .required('Подтвердите пароль'),
      })}
      onSubmit={async (
        values: TFormRegistrationValues,
        { setSubmitting }: FormikHelpers<any>,
      ) => {
        const { username, password } = values;
        const user = await registration({ username, password });

        if (typeof user !== 'string') {
          submitHandler();
        } else {
          setErr(user);
        }

        setSubmitting(false);
      }}
    >
      <Form>
        <StyledLabel htmlFor="username">
          Имя пользователя <StyledRedSpan>*</StyledRedSpan>
        </StyledLabel>
        <StyledField id="username" type="text" name="username" />
        <ErrorMessage name="username">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>

        <StyledLabel htmlFor="password">
          Пароль <StyledRedSpan>*</StyledRedSpan>
        </StyledLabel>
        <StyledField id="password" type="password" name="password" />
        <ErrorMessage name="password">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>

        <StyledLabel htmlFor="passwordConfirm">
          Подтвердите пароль <StyledRedSpan>*</StyledRedSpan>
        </StyledLabel>
        <StyledField
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
        />
        <ErrorMessage name="passwordConfirm">
          {(msg) => <StyledErrorMessage>{msg}</StyledErrorMessage>}
        </ErrorMessage>
        <StyledErrorMessage>{err}</StyledErrorMessage>

        <Button type="submit" text="Зарегистрироваться" center />
        <Button type="button" text="Назад" onClick={loginBtnHandler} center />
      </Form>
    </Formik>
  );
};

export default FormRegistration;
