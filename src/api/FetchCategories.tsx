async function FetchCategories(): Promise<[{id: number, name:string}]> {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const stringData = JSON.stringify(data);

      console.log(JSON.parse(stringData).trivia_categories);

      // Map through the keys and access the corresponding values
  
      return JSON.parse(stringData).trivia_categories;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return [{id: 0,  name:'' }]; // Return an empty array in case of an error
    }
  }

  export default FetchCategories;