import { act, fireEvent, render } from '@testing-library/react'
import axios from 'axios'
import { BrowserRouter, useLocation } from 'react-router-dom'
import AdvancedSearch from '../pages/AdvancedSearch'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}))

describe('AdvancedSearch', () => {
  test('should render successfully', () => { 
    const { getByRole } = render(<AdvancedSearch />, { wrapper: BrowserRouter });
    expect(getByRole('heading', { name: 'Activity finder' })).toBeInTheDocument();
  })

  test('should send data successfully', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data: 'ok' });
    const { getByTestId, getByRole } = render(<AdvancedSearch />, { wrapper: BrowserRouter });
    fireEvent.change(getByTestId('participants'), { target: { value: '2' } });
    await act(() => fireEvent.click(getByRole('button')));
    expect(axiosSpy).toBeCalledWith('http://www.boredapi.com/api/activity?accessibility=0&participants=2')
  })
})