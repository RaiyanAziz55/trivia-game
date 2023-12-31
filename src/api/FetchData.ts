async function FetchData(
  amount: number,
  category: string | undefined,
  type: string | undefined,
  difficulty: string | undefined
): Promise<any> {

  if (type === "random"){
    type = "";
  }else if (amount === 0){ // If a category has no questions
    throw new Error("There exists no questions for this category");
  }  
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`;
  try {

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.response_code === 0) {  
        return data;
      } else if (data.response_code === 1) {
        // Return the result of the recursive call
        return await FetchData(amount - 1, category, type, difficulty); // this is to keep fetching until there is a response where there are enough questions
                
      } else {
        throw new Error('Something happened!');
      }
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
   
    console.error('An error occurred:', error);
    throw error; // Rethrow the error to indicate a failure
  }
}

export default FetchData;
