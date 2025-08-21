import { styled } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { viewActions } from '../../store/view';

const Div = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  color: #a63d40;

  #view-only-checkbox {
    transform: scale(1.5);
    margin-right: 8px;
    cursor: pointer;
  }
`;

export default function ViewOnlyCheckbox() {
  const dispatch = useDispatch();
  const viewOnly = useSelector(state => state.view.viewOnly);

  function checkViewHandler(event) {
    dispatch(viewActions.checkView(event.target.checked));
  }

  return (
    <Div>
      <input
        id="view-only-checkbox"
        type="checkbox"
        checked={viewOnly}
        onChange={checkViewHandler}
      />
      <label htmlFor="view-only-checkbox">View only</label>
    </Div>
  );
}
