import vinylImage from '../../images/vinyl.png';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.main`
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DivError = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 250px;
  flex-wrap: wrap;

  & img {
    width: 250px;
    height: 250px;
    margin: 0px 20px;
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DivErrorText = styled.div`
  display: flex;

  font-weight: bold;
  font-size: 50px;
  flex-wrap: wrap;
`;

const DivLink = styled.div`
  display: flex;
  justify-content: center;

  & a {
    color: #a63d40;
  }
`;

export default function Error404() {
  return (
    <Main>
      <DivError>
        <div>4</div>
        <div>
          <img src={vinylImage} alt="Vinyl Record" />
        </div>
        <div>4</div>
      </DivError>
      <DivErrorText>
        <span>Like a song without lyrics - page not found</span>
      </DivErrorText>
      <DivLink>
        <Link to="/">Go to home page</Link>
      </DivLink>
    </Main>
  );
}
