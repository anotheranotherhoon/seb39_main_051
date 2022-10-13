import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';

const BorderLayout = ({ children }) => {

  return (
    <>
      <NavigationBar />
      <Container>
        <Wrapper>{children}</Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 8rem;
  font-size: 1.3rem;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 5%;
  width: 85%;
  height: 100%;
  background-color: ${(props) =>
    props.theme.theme === 'light'
      ? 'var(--color-white)'
      : 'var(--color-dark-bg-color)'};
  border: ${(props) =>
    props.theme.theme === 'light'
      ? '1rem solid var(--color-orange);'
      : '1rem solid var(--color-gray);'};
  border-radius: 1.5rem;
  h1 {
      font-size: 200%;
      font-weight: bold;
      color: ${(theme) =>
        theme.theme === 'light' ? 'var(--color-black)' : '#D2D2D2'};
    }
`;
export default BorderLayout;
