import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

// Function to get data with caching
export const fetchFromAPI = async (url) => {
  const cacheKey = `youtubeData-${url}`;
  const cachedData = localStorage.getItem(cacheKey);
  const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
  const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

  // Check if cached data exists and is valid
  if (cachedData && cacheTimestamp && (Date.now() - cacheTimestamp < cacheExpiry)) {
    return JSON.parse(cachedData);  // Return cached data if valid
  }

  try {
    // Fetch fresh data from API
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    // Cache the fresh data and the timestamp
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

