import React from 'react';
import styled from 'styled-components';

const NewProducts = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Header>NewProducts</Header>
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

export default NewProducts;
