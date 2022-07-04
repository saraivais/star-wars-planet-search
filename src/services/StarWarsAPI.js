const APIURL = 'https://swapi.dev/api/planets/';
// https://swapi.dev/documentation#planets

const getPlanetDataFromAPI = async () => {
  const APIResponse = await fetch(APIURL);
  const APIData = await APIResponse.json();
  return APIData.results;
};

export default getPlanetDataFromAPI;
