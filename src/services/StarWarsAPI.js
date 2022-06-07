const APIURL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetDataFromAPI = async () => {
  const APIResponse = await fetch(APIURL);
  const APIData = await APIResponse.json();
  return APIData.results;
};

export default getPlanetDataFromAPI;
