import AnswerCard from '../components/AnswerCard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BorderLayout from '../components/BorderLayout';
import { useEffect, useState } from 'react';
import BasicButton from '../components/BasicButton';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../components/Toast';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
const QuestionPage = () => {
  const { isLoggedIn, userId } = useSelector((state) => state.userInfoSlice);
  const params = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [nickname, setNickname] = useState('');
  const [questionId, setQuestionId] = useState('');
  const[picture, setPicture] = useState('https://maeil-mail.s3.ap-northeast-2.amazonaws.com/1.png')

  const handleDeleteQuestion = async () => {
    try {
      if (window.confirm('정말 질문을 삭제하시겠습니까?/')) {
        const response = await axiosInstance.delete(`/questions/${params.id}`);
        navigate('/questions');
      }
    } catch (error) {}
  };

  const navigatePostAnswer = () => {
    if (isLoggedIn) {
      navigate('/answer/post', {
        state: {
          questionId: questionId,
          questionContent: content,
          questionCategory: category,
        },
      });
    } else {
      if (
        window.confirm(
          '답변을 작성하시려면 로그인이 필요합니다 로그인 하시겠습니까?'
        )
      ) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+`/questions/${params.id}`).then((res) => {
      setContent(res.data.content);
      setQuestionId(res.data.questionId);
      setCategory(res.data.questionCategoryName);
      const newDate = res.data.createdAt
        .split('.')[0]
        .replace(/-/g, '.')
        .split('T');
      setDate(newDate[0]);
      setTime(newDate[1]);
      setMemberId(res.data.memberId);
      setNickname(res.data.nickname);
      const origin = res.data.answers;
      const sortedByLikesAnswer = origin.sort((a, b) =>
        a.likeCount > b.likeCount ? -1 : 1
      );
      setAnswer(sortedByLikesAnswer);
      setPicture(res.data.picture)
    });
  }, []);

  const navigateEditQuestion = () => {
    if (isLoggedIn) {
      navigate('/edit/question', {
        state: {
          questionId: questionId,
          question: content,
          category: category,
        },
      });
    } else {
      if (
        window.confirm(
          '답변을 작성하기 위해서는 로그인이 필요합니다 로그인 하시겠습니까?'
        )
      ) {
        navigate('/login');
      } else {
        return;
      }
    }
  };
  return (
    <>
      <BorderLayout>
        <Toast />
        <Title>{content}</Title>
        <ContentInfo>
          <Category>{category}</Category>
          <Writer>
            <img src={picture} alt='프로필사진' />
            {nickname}
          </Writer>
          <EventWrapper>
            <div>{date}</div>
            <div className='time'>/{time}</div>
            {userId == memberId ? (
              <EditDelete>
                <div
                  className='edit leftOne'
                  onClick={() => navigateEditQuestion()}
                >
                  수정
                </div>
                <div className='edit' onClick={() => handleDeleteQuestion()}>
                  삭제
                </div>
              </EditDelete>
            ) : (
              <></>
            )}
          </EventWrapper>
        </ContentInfo>
        <CenterWrapper>
          <AnswerToTal>
            답변 {answer.length}개
          </AnswerToTal>
          <BasicButton
            width={'5%'}
            height={'5%'}
            color={'white'}
            backGroundColor={'var(--color-orange)'}
            fontSize={'1.3rem'}
            padding={'1rem'}
            onClick={navigatePostAnswer}
            text={'답변등록'}
          />
        </CenterWrapper>
        {answer.map((el, i) => (
          <AnswerCard
            key={el.answerId}
            profileImg='/default.png'
            nickname={el.nickname}
            createdAt={el.createdAt.split('.')[0].replace(/-/g, '.')}
            memberId={el.memberId}
            content={el.content}
            likeCount={el.likeCount}
            comment={el.comments.sort((a, b) =>
              a.likeCount > b.likeCount ? -1 : 1
            )}
            answerId={el.answerId}
            picture={el.picture}
            answer={answer}
            setAnswer={setAnswer}
          />
        ))}
      </BorderLayout>
    </>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) =>
    props.theme.theme === 'light' ? 'var(--color-black)' : '#D2D2D2'};
`;
const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 2% 0;
`;
const Category = styled.div`
  margin-right: auto;
  padding: 1rem;
  border-radius: 1.5rem;
  color: ${(props) =>
    props.theme.theme === 'light' ? 'var(--color-white)' : '#D2D2D2'};
  text-align: center;
  background-color: ${(props) =>
    props.theme.theme === 'light'
      ? ' var(--color-orange)'
      : 'var(--color-gray)'};
  min-width: 8.8rem;
  @media screen and (max-width: 413px) {
    padding: 0.5rem;
  }
`;
const Writer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  max-width: 11.8rem;
  color: ${(props) =>
    props.theme.theme === 'light' ? 'var(--color-black)' : '#D2D2D2'};
  img {
    display: inline;
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
  }
`;

const CenterWrapper = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 0.5%;
  button {
    min-width: 7rem;
  }
  @media screen and (max-width: 413px) {
    button {
      width: 15%;
      padding: 0.5rem;
    }
  }
`;

const AnswerToTal = styled.div`
  font-weight: bold;
  margin-right: auto;
  color: ${(props) =>
    props.theme.theme === 'light' ? 'var(--color-black)' : '#D2D2D2'};
`;

const EventWrapper = styled.div`
  display: flex;
  font-size: 1.2rem;
  @media screen and (max-width: 413px) {
    display: block;
    .time {
      display: none;
    }
  }
`;

const EditDelete = styled.div`
  display: flex;
  .edit {
    min-width: 2.3rem;
    color: #d4d4d4;
    cursor: pointer;
  }
  .leftOne {
    margin-right: 5%;
  }
  @media screen and (max-width: 413px) {
    .edit {
      margin-left: auto;
    }
  }
`;

export default QuestionPage;
