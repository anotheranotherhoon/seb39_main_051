import { useState } from 'react';
import styled, { css } from 'styled-components';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropDownList = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <DropDownWrapper onClick={handleClick}>
        <StyledUl >
          <li>{`${props.seleted}`}</li>
          <FontAwesomeIcon icon={faAngleDown} />
        </StyledUl>
        {props.type === 'questions' ? (
          isOpen ? (
            <>
              <StyledUl active >
                <li onClick={(e)=>props.handleCategory(e)}>Java</li>
                <li onClick={(e)=>props.handleCategory(e)}>Javascript</li>
                <li onClick={(e)=>props.handleCategory(e)}>React</li>
                <li onClick={(e)=>props.handleCategory(e)}>Spring</li>
                <li onClick={(e)=>props.handleCategory(e)}>Data Structure</li>
                <li onClick={(e)=>props.handleCategory(e)}>Operating System</li>
                <li onClick={(e)=>props.handleCategory(e)}>Database</li>
                <li onClick={(e)=>props.handleCategory(e)}>Network</li>
              </StyledUl>
            </>
          ) : (
            <></>
          )
        ) : props.type === 'free' ? (
          isOpen ? (
            <>
              <StyledUl active >
                <li onClick={(e)=>props.handleCategory(e)}>취업 정보</li>
                <li onClick={(e)=>props.handleCategory(e)}>고민 상담</li>
                <li onClick={(e)=>props.handleCategory(e)}>유머</li>
                <li onClick={(e)=>props.handleCategory(e)}>잡담</li>
              </StyledUl>
            </>
          ) : (
            <></>
          )
        ) : isOpen ? (
          <>
            <StyledUl active >
              <li onClick={(e)=>props.handleCategory(e)}>질문 추가 요청</li>
              <li onClick={(e)=>props.handleCategory(e)}>질문 수정 요청</li>
              <li onClick={(e)=>props.handleCategory(e)}>기타</li>
            </StyledUl>
          </>
        ) : (
          <></>
        )}
      </DropDownWrapper>
    </>
  );
};

const DropDownWrapper = styled.div`
  position: relative;
  max-width: 20rem;
  height: 4rem;
  font-size: 1.8rem;
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  height: 4rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.theme.theme === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  border-radius: 1rem;
  color:var(--color-white);
  cursor: pointer;

  ${(props) => {
    if (props.active) {
      return css`
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 4rem;
        height: fit-content;
        border-top: ${(props) =>
          props.theme.theme === 'light'
            ? '0.1rem solid #d2d2d2'
            : '0.1rem solid var(--color-gray)'};

        & li {
          display: flex;
          align-items: center;
          width: 100%;
          height: 2rem;
          padding-top: 0.1rem;
          margin: 0.3rem 0;
          border-radius: 0.3rem;
        }

        & li:hover {
          background-color: ${(props) =>
            props.theme.theme === 'light'
              ? 'var(--color-yellow)'
              : 'var(--color-gray)'};
          color: ${(props) =>
            props.theme.theme === 'light'
              ? 'var(--color-black)'
              : 'var(--color-white)'};
        }
      `;
    }
  }}
`;

export default DropDownList;
