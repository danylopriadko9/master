import React from 'react';
import styled from 'styled-components';

const Services = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Header>Services</Header>
    </Container>
  );
};

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  min-height: 50vh;
`;

const Header = styled.h2`
  text-align: center;
`;

export default Services;