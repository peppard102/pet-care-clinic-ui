import { renderHook } from '@testing-library/react';
import useIsMobile from './useIsMobile';
import { changeScreenSize } from '../testHelperFunctions';

describe('useIsMobile', () => {
  it('returns true when screen is mobile', () => {
    changeScreenSize('400px');

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('returns false when screen is not mobile', () => {
    changeScreenSize('1200px');

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
