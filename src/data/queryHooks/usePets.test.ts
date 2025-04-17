import { renderHook } from '@testing-library/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import usePets from './usePets';
import { petsMockData } from '../../mocks/mockData/petsMockData';
import { formatAddress } from '../../utils/helperFunctions';
import { Mock } from 'vitest';

// Mock the React Query hook
vi.mock('@tanstack/react-query', () => ({
  useSuspenseQuery: vi.fn(),
}));

// Type assertion for the mocked function
const mockedUseSuspenseQuery = useSuspenseQuery as Mock;

describe('usePets', () => {
  it('should transform pet data with formatted address and full name', () => {
    // Setup mock response
    mockedUseSuspenseQuery.mockReturnValue({
      data: [petsMockData[0]], // Use first pet from mock data
    });

    // Execute the hook
    const { result } = renderHook(() => usePets());

    // Get the original pet data that was passed to the hook
    const originalPet = petsMockData[0];
    
    // Get the transformed pet data
    const transformedPet = result.current[0];

    // Verify the transformation for formatted address
    expect(transformedPet.formattedAddress).toBe(
      formatAddress(
        originalPet.address.street,
        originalPet.address.city,
        originalPet.address.state,
        originalPet.address.zipCode
      )
    );

    // Verify the transformation for full name
    expect(transformedPet.fullName).toBe(
      `${originalPet.firstName || ''} ${originalPet.lastName || ''}`
    );

    // Verify that other properties are preserved
    expect(transformedPet.id).toBe(originalPet.id);
    expect(transformedPet.age).toBe(originalPet.age);
  });

  it('should handle missing firstName or lastName in full name concatenation', () => {
    // Setup mock response with missing firstName
    const petWithMissingFirstName = {
      ...petsMockData[0],
      firstName: undefined
    };
    
    mockedUseSuspenseQuery.mockReturnValue({
      data: [petWithMissingFirstName],
    });

    // Execute the hook
    const { result: result1 } = renderHook(() => usePets());
    
    // Verify the transformation handles missing firstName
    expect(result1.current[0].fullName).toBe(` ${petWithMissingFirstName.lastName}`);

    // Setup mock response with missing lastName
    const petWithMissingLastName = {
      ...petsMockData[0],
      lastName: undefined
    };
    
    mockedUseSuspenseQuery.mockReturnValue({
      data: [petWithMissingLastName],
    });

    // Execute the hook again
    const { result: result2 } = renderHook(() => usePets());
    
    // Verify the transformation handles missing lastName
    expect(result2.current[0].fullName).toBe(`${petWithMissingLastName.firstName} `);
  });

  it('should handle missing address fields', () => {
    // Setup mock response with missing address fields
    const petWithIncompleteAddress = {
      ...petsMockData[0],
      address: {
        street: '123 Main St',
        city: '', // missing city
        state: 'NY',
        zipCode: '10001'
      }
    };
    
    mockedUseSuspenseQuery.mockReturnValue({
      data: [petWithIncompleteAddress],
    });

    // Execute the hook
    const { result } = renderHook(() => usePets());
    
    // Verify the address formatting when fields are missing
    expect(result.current[0].formattedAddress).toBe('');
  });

  it('should return empty array when data is undefined', () => {
    // Setup mock response with undefined data
    mockedUseSuspenseQuery.mockReturnValue({
      data: undefined,
    });

    // Execute the hook
    const { result } = renderHook(() => usePets());
    
    // Verify that an empty array is returned
    expect(result.current).toEqual([]);
  });
});
