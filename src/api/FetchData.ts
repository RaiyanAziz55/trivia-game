async function FetchData(
  amount: number,
  category: string | undefined,
  type: string | undefined,
  difficulty: string | undefined
): Promise<any> {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.response_code === 0) {
        return data;
      } else if (data.response_code === 1) {
        // Return the result of the recursive call
        return await FetchData(amount - 1, category, type, difficulty);
      } else {
        throw new Error('Something happened!');
      }
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    // Handle any errors that occur during the fetch or processing
    console.error('An error occurred:', error);
    throw error; // Rethrow the error to indicate a failure
  }
}

export default FetchData;
