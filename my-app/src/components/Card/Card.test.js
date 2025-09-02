import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import CardLyrics from './CardLyrics';
import CardFunctionality from './CardFunctionality';
import { useSelector } from 'react-redux';
import { songActions } from '../../store/song';

// Мок navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Мок redux
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

// Мок songActions
jest.mock('../../store/song', () => ({
  songActions: {
    updateSelectedCard: jest.fn(),
    saveEditedCard: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
  useSelector.mockImplementation(cb => cb({ view: { viewOnly: false } }));
});

describe('Card component', () => {
  test('Click on checkbox calls updateSelectedCard', () => {
    render(<Card id={1} title="Title" text="Lyrics" isChecked={false} />);

    const checkboxElement = screen.getByRole('checkbox');
    userEvent.click(checkboxElement);

    expect(songActions.updateSelectedCard).toHaveBeenCalledWith({
      id: 1,
      isChecked: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith(songActions.updateSelectedCard.mock.results[0].value);
  });

  test('Click on Edit calls updateSelectedCard and resets isChecked', () => {
    render(<Card id={1} title="Title" text="Lyrics" isChecked={true} />);

    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);

    expect(songActions.updateSelectedCard).toHaveBeenCalledWith({
      id: 1,
      isChecked: false,
    });

    expect(mockDispatch).toHaveBeenCalledWith(songActions.updateSelectedCard.mock.results[0].value);
  });

  test('Double click handle navigation in view mode', () => {
    render(<Card id={1} title="Title" text="Lyrics" isChecked={false} />);

    const cardElement = screen.getByText('Title').closest('.card');
    userEvent.dblClick(cardElement);

    expect(mockNavigate).toHaveBeenCalledWith('/card/1');
  });

  test('Double click does not handle navigation in editing mode', () => {
    render(<Card id={1} title="Title" text="Lyrics" isChecked={false} />);

    const editButton = screen.getByText('Edit');
    userEvent.click(editButton);

    const cardElement = screen.getByDisplayValue('Title').closest('.card');
    userEvent.dblClick(cardElement);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('Save button calls saveEditedCard', () => {
    render(<Card id={1} title="Title" text="Lyrics" isChecked={true} />);

    const editButton = screen.getByText('Edit');
    userEvent.click(editButton);

    const input = screen.getByDisplayValue('Title');
    userEvent.clear(input);
    userEvent.type(input, 'NewTitle');
    const textarea = screen.getByDisplayValue('Lyrics');
    userEvent.clear(textarea);
    userEvent.type(textarea, 'NewLyrics');

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
    userEvent.click(saveButton);

    expect(songActions.saveEditedCard).toHaveBeenCalledWith({
      id: 1,
      newTitle: 'NewTitle',
      newText: 'NewLyrics',
    });

    expect(mockDispatch).toHaveBeenCalledWith(songActions.saveEditedCard.mock.results[0].value);
  });

  test('Exit button does not apply any changes to card', () => {
    render(<Card id={1} title="Title" text="Lyrics" isChecked={true} />);

    const editButton = screen.getByText('Edit');
    userEvent.click(editButton);

    const input = screen.getByDisplayValue('Title');
    userEvent.clear(input);
    userEvent.type(input, 'NewTitle');
    const textarea = screen.getByDisplayValue('Lyrics');
    userEvent.clear(textarea);
    userEvent.type(textarea, 'NewLyrics');

    const exitButton = screen.getByText('Exit');
    expect(exitButton).toBeInTheDocument();
    userEvent.click(exitButton);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Lyrics')).toBeInTheDocument();
  });
});

describe('CardLyrics component', () => {
  test('shows title and text when not editing', () => {
    render(
      <CardLyrics
        isEditing={false}
        newTitle="Title"
        newText="Lyrics"
        setNewTitle={() => {}}
        setNewText={() => {}}
      />
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Lyrics')).toBeInTheDocument();
  });

  test('shows input and textarea when editing', () => {
    const setNewTitle = jest.fn();
    const setNewText = jest.fn();

    render(
      <CardLyrics
        isEditing={true}
        newTitle="Title"
        newText="Lyrics"
        setNewTitle={setNewTitle}
        setNewText={setNewText}
      />
    );

    const input = screen.getByDisplayValue('Title');
    const textarea = screen.getByDisplayValue('Lyrics');

    expect(input).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();

    userEvent.type(input, 'NewTitle');
    expect(setNewTitle).toHaveBeenCalled();
    userEvent.type(textarea, 'NewLyrics');
    expect(setNewText).toHaveBeenCalled();
  });
});

describe('CardFunctionality component', () => {
  test('shows Edit button and checkbox and handles clicks when viewOnly and isEditing are false', () => {
    const checkChange = jest.fn();
    const editCardHandler = jest.fn();

    render(
      <CardFunctionality
        checkChange={checkChange}
        isEditing={false}
        viewOnly={false}
        saveEditedCardHandler={() => {}}
        exitFromEditingHandler={() => {}}
        editCardHandler={editCardHandler}
        id={1}
        isChecked={false}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkChange).toHaveBeenCalled();

    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    expect(editCardHandler).toHaveBeenCalled();

    const saveButton = screen.queryByText('Save', {
      exact: false,
    });
    expect(saveButton).toBeNull();

    const exitButton = screen.queryByText('Exit', {
      exact: false,
    });
    expect(exitButton).toBeNull();
  });

  test('shows Save and Exit buttons and handles clicks when isEditing is true', () => {
    const saveEditedCardHandler = jest.fn();
    const exitFromEditingHandler = jest.fn();

    render(
      <CardFunctionality
        checkChange={() => {}}
        isEditing={true}
        viewOnly={false}
        saveEditedCardHandler={saveEditedCardHandler}
        exitFromEditingHandler={exitFromEditingHandler}
        editCardHandler={() => {}}
        id={1}
        isChecked={false}
      />
    );

    const editButton = screen.queryByText('Edit', {
      exact: false,
    });
    expect(editButton).toBeNull();

    const checkbox = screen.queryByRole('checkbox', {
      exact: false,
    });
    expect(checkbox).toBeNull();

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
    userEvent.click(saveButton);
    expect(saveEditedCardHandler).toHaveBeenCalled();

    const exitButton = screen.getByText('Exit');
    expect(exitButton).toBeInTheDocument();
    userEvent.click(exitButton);
    expect(exitFromEditingHandler).toHaveBeenCalled();
  });

  test('does not show buttons when viewOnly is true', () => {
    render(
      <CardFunctionality
        checkChange={() => {}}
        isEditing={false}
        viewOnly={true}
        saveEditedCardHandler={() => {}}
        exitFromEditingHandler={() => {}}
        editCardHandler={() => {}}
        id={1}
        isChecked={false}
      />
    );

    expect(screen.queryByText('Edit')).toBeNull();
    expect(screen.queryByText('Save')).toBeNull();
    expect(screen.queryByText('Exit')).toBeNull();
  });
});
