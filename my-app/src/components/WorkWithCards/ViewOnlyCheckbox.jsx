import { styled } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { viewActions } from '../../store/view';

const Div = styled.div`
  margin: 0px 20px 0px 0px;
  font-weight: bold;
  color: #a63d40;
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
