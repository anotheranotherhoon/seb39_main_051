import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Toast = () => {
    return(
        <StyledContainer />
    )
}

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    background-color: ${(props)=>props.theme.theme==='light'? 'var(--color-orange)' : 'var(--color-gray)'};
    color:var(--color-white);
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
    background-color:  ${(props) => props.theme.theme==='light' ? 'var(--color-yellow)': 'var(--color-black)'};
  }
`;

export default Toast 