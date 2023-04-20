import React, { createContext, useState } from 'react';
import Button from '../../components/Elements/Button/Button';
import {
  StyledCalculator,
  StyledCalculatorDesc,
  StyledServicesWrapper,
} from './StyledCalculator';
import cookie from 'cookie';
import { GetServerSideProps, NextPage } from 'next';
import { ICalculator, ICalculatorContext } from './ICalculator';
import Services from '../../components/Blocks/Services/Services';
import Cart from '../../components/Blocks/Cart/Cart';
import Container from '../../components/Blocks/Container/Container';
import { IService } from '../../commonInterfaces/IService';
import { StyledTitle } from '../../components/commonStyles/StyledTitle';

export const CalculatorContext = createContext<ICalculatorContext>({
  serviceButtonHandler: (value: IService) => {},
});

const Calculator: NextPage<ICalculator> = ({ auth, services }) => {
  const [showServices, setShowServices] = useState(false);
  const [cartServices, setCartServices] = useState<IService[]>([]);

  const serviceButtonHandler = (service: IService) => {
    if (showServices && !auth) {
      setCartServices([...cartServices, service]);
    }

    setShowServices(!showServices);
  };

  return (
    <CalculatorContext.Provider value={{ serviceButtonHandler }}>
      <StyledCalculator>
        <Container column>
          <StyledServicesWrapper>
            <StyledTitle>Калькулятор</StyledTitle>
            <StyledCalculatorDesc>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Temporibus non modi, molestias soluta perspiciatis sequi
              distinctio, nemo earum qui ut maxime voluptatibus voluptates. Sint
              aliquam excepturi alias, optio iure possimus. Nisi omnis quis
              asperiores quae dolorum assumenda nemo rem, quam dignissimos
              optio, dolorem expedita unde saepe laborum. Doloribus quas
              obcaecati magnam, rem unde error quis vero hic, nam itaque
              distinctio. Culpa, in unde saepe, perferendis dolor officia
              repellendus eligendi voluptatibus, maxime fuga cumque quibusdam
              mollitia assumenda! Enim minima dolore, repellat quasi tempore
              labore, accusantium dolores optio assumenda corrupti laudantium
              omnis. Odit labore recusandae molestias nulla consequuntur iste
              ullam repudiandae. Sequi expedita ipsum atque molestias
              repudiandae facere quidem voluptates commodi voluptatum vitae eum
              recusandae, eveniet officia harum esse ea nesciunt ex?
            </StyledCalculatorDesc>
            <Button
              type="button"
              text={auth ? 'Добавить Услугу' : 'Выбрать Услугу'}
              onClick={serviceButtonHandler}
            />
            {showServices && <Services auth={auth} services={services} />}
            <Cart cartServices={cartServices} />
          </StyledServicesWrapper>
        </Container>
      </StyledCalculator>
    </CalculatorContext.Provider>
  );
};

export default Calculator;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = cookie.parse(ctx.req.headers.cookie || '');
  const auth = !!cookies.token;

  const res = await fetch('http://192.168.1.2:8000/services');

  const services = await res.json();
  console.log(services);

  return {
    props: {
      auth,
      services,
    },
  };
};
