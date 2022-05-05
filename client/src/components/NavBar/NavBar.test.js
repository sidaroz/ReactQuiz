import {screen} from '@testing-library/react';
import NavBar from './Index';

describe('NavBar', () => {
	beforeEach(() => {render(<NavBar />)})
	
	it ('The h1 contains Zoomie', ( ) => {
		const navbar = screen.getByRole('NavBar');
        expect(navbar.)//to contain h1
		expect(navbar.textContent).toBe("Zoomie");  
	});

});



