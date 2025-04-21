import { renderHook } from '@testing-library/react';
import useIsTablet from './useIsTablet';
import { changeScreenSize } from '../testHelperFunctions';

describe('useIsTablet', () => {
  it('returns true when screen is tablet sized', () => {
    changeScreenSize('700px');

    const { result } = renderHook(() => useIsTablet());
    expect(result.current).toBe(true);
  });

  it('returns false when screen is mobile sized', () => {
    changeScreenSize('400px');

    const { result } = renderHook(() => useIsTablet());
    expect(result.current).toBe(false);
  });

  it('returns false when screen is desktop sized', () => {
    changeScreenSize('1200px');

    const { result } = renderHook(() => useIsTablet());
    expect(result.current).toBe(false);
  });
});
