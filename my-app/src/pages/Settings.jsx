import ViewOnlyCheckbox from '../components/WorkWithCards/ViewOnlyCheckbox.jsx';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
`;

export default function Settings() {
  const isAdmin = useSelector(state => state.auth.isAdmin);

  return (
    <main>
      <div>
        {isAdmin ? <ViewOnlyCheckbox /> : <Div>You are not authorized to view this page</Div>}
      </div>
    </main>
  );
}
