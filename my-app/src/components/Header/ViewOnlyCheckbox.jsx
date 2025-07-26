import { styled } from 'styled-components';
import { SongContext } from '../../app_context/song-context.jsx';
import { useContext } from 'react';

const Div = styled.div`
  margin: 0px 20px 0px 0px;
  font-weight: bold;
  color: #a63d40;
`;

export default function ViewOnlyCheckbox() {
  const { checkView } = useContext(SongContext);

  return (
    <Div>
      <input id="view-only-checkbox" type="checkbox" onChange={checkView} />
      <label for="view-only-checkbox">View only</label>
    </Div>
  );
}
