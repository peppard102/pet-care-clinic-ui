import { renderHook } from '@testing-library/react';
import useIsTabletOrSmaller from './useIsTabletOrSmaller';
import { changeScreenSize } from '../testHelperFunctions';

describe('useIsTabletOrSmaller', () => {
  it('returns true when screen is mobile', () => {
    changeScreenSize('400px');

    const { result } = renderHook(() => useIsTabletOrSmaller());
    expect(result.current).toBe(true);
  });

  it('returns true when screen is tablet sized', () => {
    changeScreenSize('700px');

    const { result } = renderHook(() => useIsTabletOrSmaller());
    expect(result.current).toBe(true);
  });

  it('returns false when screen is not mobile', () => {
    changeScreenSize('1200px');

    const { result } = renderHook(() => useIsTabletOrSmaller());
    expect(result.current).toBe(false);
  });
});
