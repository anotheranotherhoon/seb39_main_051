import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BasicButton from '../../components/BasicButton'
import BorderLayout from '../../components/BorderLayout';
import UserImg from '../../components/UserImg';
import axiosInstance from '../../utils/axiosInstance';
import { setCookie } from '../../utils/cookie';

const UserImgPage = () => {
  const {userPicture} = useSelector((state)=>state.userInfoSlice)

  const formData = new FormData();

  const handleImgInput = (e) => {
    if (e.target.files) {
      formData.append('files', e.target.files[0]);
    }
  };

  const handleOnClick = () => {
    axiosInstance.post('/my-page/upload', formData)
    .then((res)=>{
      setCookie('picture',res.data, 60)
      alert('프로필 사진이 변경되었습니다.')
      window.location.reload()
    })
  };

  return (
    <>
      <BorderLayout>
        <Layout>
          <LeftContent>
            <div className='mobile'>
              <a href='/mypage'>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size='2x'
                  className='icon'
                />
              </a>
              <UserProfileImage src={userPicture} />
              <div>
                <span>사진을 드래그해주세요.</span>
                <InputImgWrapper>
                  <InputImg
                    type='file'
                    accept='image/*'
                    onChange={handleImgInput}
                  />
                </InputImgWrapper>
                <BasicButton
                
                  width='30%'
                  height='4rem'
                  color='var(--color-white)'
                  backGroundColor='var(--color-orange)'
                  fontSize='1.3rem'
                  text='변경하기'
                  onClick={handleOnClick}
                />
              </div>
            </div>
            <div className='web'>
              <UserProfileImage src={userPicture}/>
              <a href='/mypage'>
                <BasicButton
                
                  width='100%'
                  height='4rem'
                  color='var(--color-white)'
                  backGroundColor='var(--color-orange)'
                  fontSize='1.8rem'
                  text='대쉬보드'
                />
              </a>
              <a href='/userimg'>
                <BasicButton
                
                  width='100%'
                  height='4rem'
                  color='var(--color-white)'
                  backGroundColor='var(--color-orange)'
                  fontSize='1.8rem'
                  text='프로필 사진 변경'
                  selected
                />
              </a>
              <a href='/username'>
                <BasicButton
                
                  width='100%'
                  height='4rem'
                  color='var(--color-white)'
                  backGroundColor='var(--color-orange)'
                  fontSize='1.8rem'
                  text='닉네임 변경'
                />
              </a>
              <a href='/userpassword'>
                <BasicButton
                
                  width='100%'
                  height='4rem'
                  color='var(--color-white)'
                  backGroundColor='var(--color-orange)'
                  fontSize='1.8rem'
                  text='비밀번호 변경'
                />
              </a>
            </div>
          </LeftContent>
          <RightContent>
            <UserImg
              handleImgInput={handleImgInput}
              handleOnClick={handleOnClick}
            />
          </RightContent>
        </Layout>
      </BorderLayout>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1025px) {
    height: 70rem;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  min-width: 25rem;
  margin-right: 5rem;

  a {
    width: 80%;
    height: 4rem;
    margin: 2rem 0;
  }

  @media screen and (max-width: 1025px) {
    width: 100%;
    margin: 0;

    a {
      width: 100%;
      height: 4rem;
      margin: 2rem 0;
    }

    .web {
      display: none;
    }

    .mobile {
      .icon {
        color: var(--color-black);
        margin-bottom: 2rem;
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        height: 90%;

        & span {
          position: relative;
          color: var(--color-white);
          top: 43%;
          right: 26%;
        }
      }
    }
  }

  @media screen and (min-width: 1026px) {
    .mobile {
      display: none;
    }

    .web {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
`;

const UserProfileImage = styled.img`
  display: block;
  width: 25rem;
  height: 25rem;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1rem solid
    ${(props) =>
      props.theme.theme === 'light'
        ? 'var(--color-orange)'
        : 'var(--color-gray)'};
  border-radius: 1.5rem;
  padding: 5rem;

  @media screen and (max-width: 1025px) {
    display: none;
  }
`;

const InputImgWrapper = styled.div`
  width: 100%;
  height: 30%;
  background-color: ${(props) =>
    props.theme.theme === 'light' ? 'var(--color-orange)' : 'var(--color-gray)'};
  color: var(--color-white);
  border-radius: 1.5rem;
  margin-bottom: 3rem;
`;

const InputImg = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 1.5rem;
  opacity: 0;
  cursor: pointer;
`;

export default UserImgPage;
