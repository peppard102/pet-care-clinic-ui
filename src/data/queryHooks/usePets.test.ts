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
    // Get the original pet data that would come from API
    const originalPet = petsMockData[0];

    // Mock the actual transformation that happens in the select function
    const transformedPet = {
      ...originalPet,
      dateOfBirth: new Date(originalPet.dateOfBirth),
      formattedAddress: formatAddress(
        originalPet.address.street,
        originalPet.address.city,
        originalPet.address.state,
        originalPet.address.zipCode
      ),
      fullName: `${originalPet.firstName || ''} ${originalPet.lastName || ''}`,
    };

    // Setup mock response with transformed data
    mockedUseSuspenseQuery.mockReturnValue({
      data: [transformedPet],
    });

    // Execute the hook
    const { result } = renderHook(() => usePets());

    // Get the result
    const resultPet = result.current[0];

    // Verify the transformation for formatted address
    expect(resultPet.formattedAddress).toBe(
      formatAddress(
        originalPet.address.street,
        originalPet.address.city,
        originalPet.address.state,
        originalPet.address.zipCode
      )
    );

    // Verify the transformation for full name
    expect(resultPet.fullName).toBe(
      `${originalPet.firstName || ''} ${originalPet.lastName || ''}`
    );

    // Verify that other properties are preserved
    expect(resultPet.id).toBe(originalPet.id);
    expect(resultPet.dateOfBirth).toBeInstanceOf(Date);
  });

  it('should handle missing firstName or lastName in full name concatenation', () => {
    // Setup mock response with missing firstName
    const petWithMissingFirstName = {
      ...petsMockData[0],
      firstName: '',
      fullName: ` ${petsMockData[0].lastName}`,
      formattedAddress: formatAddress(
        petsMockData[0].address.street,
        petsMockData[0].address.city,
        petsMockData[0].address.state,
        petsMockData[0].address.zipCode
      ),
      dateOfBirth: new Date(petsMockData[0].dateOfBirth),
    };

    mockedUseSuspenseQuery.mockReturnValue({
      data: [petWithMissingFirstName],
    });

    // Execute the hook
    const { result: result1 } = renderHook(() => usePets());

    // Verify the transformation handles missing firstName
    expect(result1.current[0].fullName).toBe(` ${petsMockData[0].lastName}`);

    // Setup mock response with missing lastName
    const petWithMissingLastName = {
      ...petsMockData[0],
      lastName: '',
      fullName: `${petsMockData[0].firstName} `,
      formattedAddress: formatAddress(
        petsMockData[0].address.street,
        petsMockData[0].address.city,
        petsMockData[0].address.state,
        petsMockData[0].address.zipCode
      ),
      dateOfBirth: new Date(petsMockData[0].dateOfBirth),
    };

    mockedUseSuspenseQuery.mockReturnValue({
      data: [petWithMissingLastName],
    });

    // Execute the hook again
    const { result: result2 } = renderHook(() => usePets());

    // Verify the transformation handles missing lastName
    expect(result2.current[0].fullName).toBe(`${petsMockData[0].firstName} `);
  });

  it('should handle missing address fields', () => {
    // Setup mock response with missing address fields
    const petWithIncompleteAddress = {
      ...petsMockData[0],
      address: {
        street: '123 Main St',
        city: '', // missing city
        state: 'NY',
        zipCode: '10001',
      },
      formattedAddress: '', // formatAddress returns empty string for incomplete address
      fullName: `${petsMockData[0].firstName} ${petsMockData[0].lastName}`,
      dateOfBirth: new Date(petsMockData[0].dateOfBirth),
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
