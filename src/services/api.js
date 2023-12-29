const BASE_URL = 'http://localhost:50005'; // Replace with your server URL

export const fetchData = async (url, options = { method: 'GET' }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      // Add other headers as needed
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });

    if (!response.ok) {
      throw new Error(response.statusText || 'Fetch failed');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      // Handle non-JSON response (e.g., text, HTML, etc.)
      return response.text();
    }
  } catch (error) {
    console.error('Network Error:', error);
    throw new Error('Network request failed. Please check your connection and try again.');
  }
};
