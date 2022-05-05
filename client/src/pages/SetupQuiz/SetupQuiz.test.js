import SetupQuiz from '.';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SetupQuiz', () => {
    let getResultMock;

    beforeEach(() => {
        getResultMock = jest.fn();
        render(<SetupQuiz getResult={getResultMock}/>);
    });

    test('it renders a div', () => {
        let form = screen.getByRole('form');
        expect(form).toBeInTheDocument();;
    });

    test('it calls on getResult prop on form submission', () => {
        let locationInput = screen.getByLabelText('Location');
        userEvent.type(locationInput, "Hong Kong{enter}")
        expect(getResultMock).toHaveBeenNthCalledWith(1, 'Hong Kong');
    })
});
