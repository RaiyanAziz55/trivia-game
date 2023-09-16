
  
  async function FetchData(amount, category, type, difficulty) {
    const url = "https://opentdb.com/api.php?amount=" + amount + "&difficulty=" + difficulty + "&type=" + type + "&category=" + category;
  
    try {
      const response = await fetch(url);
  
      // Check if the response status is OK (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response as needed (assuming it's JSON data)
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Optionally, rethrow the error for the caller to handle
    }
  }
  
  export default FetchData;
  