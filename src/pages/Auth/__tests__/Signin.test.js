import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../SignIn';


it('should be users name', () => {
    const { asFragment } = render(<SignIn />);
    // console.log('element :>> ', element);
    expect(asFragment(<SignIn />)).toMatchSnapshot();
});


