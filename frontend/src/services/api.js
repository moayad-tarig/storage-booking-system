const API_BASE_URL = '/api/v1';

export const api = {
  // Units
  getUnits: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${API_BASE_URL}/units?${queryParams}`;
      console.log('Fetching units from:', url);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        console.log('Error response content type:', contentType);
        
        if (contentType?.includes('application/json')) {
          const error = await response.json();
          console.log('Error response body:', error);
          throw new Error(error.message || 'Failed to fetch units');
        } else {
          const text = await response.text();
          console.log('Error response text:', text);
          throw new Error('Server error occurred');
        }
      }
      
      const data = await response.json();
      console.log('Success response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching units:', error);
      throw error;
    }
  },

  // Bookings
  getBookings: async (userName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings?userName=${encodeURIComponent(userName)}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch bookings');
        } else {
          throw new Error('Server error occurred');
        }
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
          const error = await response.json();
          if (error.message?.includes('already booked')) {
            throw new Error('This unit is already booked for the selected dates. Please choose different dates.');
          }
          throw new Error(error.message || 'Failed to create booking');
        } else {
          throw new Error('Server error occurred');
        }
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Check unit availability
  checkUnitAvailability: async (unitId, startDate, endDate) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/units/${unitId}/availability?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to check unit availability');
        } else {
          throw new Error('Server error occurred');
        }
      }
      
      return response.json();
    } catch (error) {
      console.error('Error checking unit availability:', error);
      throw error;
    }
  },
}; 