import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import TapMenu from '../components/TapMenu';
import Search from '../components/Search';
import BasicButton from '../components/BasicButton';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import PostSummary from '../components/PostSummary';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SuggestionBoardPage = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const categoryArr = ['질문 추가 요청', '질문 수정 요청', '기타'];

  const { category } = useParams();

  useEffect(() => {
    if ((value !== '') & (categoryArr.indexOf(category) !== -1)) {
      axios
        .get(
          `/posts/search?category=${category}&keyword=${value}&page=${page}&size=10`
        )
        .then((res) => {
          setData(res.data.data);
        });
    } else if (value !== '') {
      axios
        .get(
          `/posts/search?type=건의게시판&keyword=${value}&page=${page}&size=10`
        )
        .then((res) => {
          setData(res.data.data);
        });
    } else if (categoryArr.indexOf(category) !== -1) {
      axios
        .get(`/posts?category=${category}&page=${page}&size=${size}`)
        .then((res) => setData(res.data.data));
    } else {
      axios
        .get(`/posts?type=건의게시판&page=${page}&size=${size}`)
        .then((res) => {
          setData(res.data.data);
        });
      navigate('/suggestion');
    }
  }, [category, page, value]);

  const handleOnClick = () => {
    navigate('/post', {
      state: { type: 'suggestion', category: category || '질문 추가 요청' },
    });
  };

  const navigateToPostSumary = (id) => {
    navigate(`/board/${id}`);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      setValue(e.target.value);
      if (categoryArr.indexOf(category) !== -1) {
        axios
          .get(
            `/questions/search?questionCategory=${category}&keyword=${value}&page=${page}&size=10`
          )
          .then((res) => setData(res.data.data));
      } else {
        axios
          .get(`/questions/search?keyword=${value}&page=${page}&size=10`)
          .then((res) => {
            setData(res.data.data);
          });
      }
    }
  };

  return (
    <>
      <NavigationBar />
      <ContentWrapper>
        <MenuWrapper>
          <TapMenu themeState={themeState} />
          <Search themeState={themeState} handleEnter={handleEnter} />
        </MenuWrapper>
        <ButtonWrapper>
          <BasicButton
            themeState={themeState}
            width='10rem'
            height='4rem'
            color='var(--color-white)'
            backGroundColor='var(--color-orange)'
            fontSize='1.3rem'
            text='글 작성하기'
            onClick={handleOnClick}
          />
        </ButtonWrapper>
        <PostSummaryWrapper>
          {data.map((el) => (
            <PostSummary
              themeState={themeState}
              key={el.postId}
              title={el.title}
              category={el.category}
              likes={el.likes}
              picture={el.member.picture}
              writer={el.member.nickname}
              createdAt={el.createdAt}
              onClick={() => navigateToPostSumary(el.postId)}
            />
          ))}
        </PostSummaryWrapper>
        <Pagination
          themeState={themeState}
          type='건의게시판'
          page={page}
          size={size}
          total={total}
          setPage={setPage}
          setSize={setSize}
          setTotal={setTotal}
          value={value}
        />
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;

  @media screen and (max-width: 412px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 80%;
  margin-top: 2rem;
`;

const PostSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem;
`;

export default SuggestionBoardPage;
