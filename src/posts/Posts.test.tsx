import * as reactRedux from 'react-redux';
import { Posts } from './Posts';
import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';



describe('Posts component test', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
  it('', () => {
    render(<Posts/>);
  });
});
