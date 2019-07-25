'use strict'



const api_key = 'f50bZZ7SRycYtG0VMf2yYo67gxyxdZjQsKWkRBBg'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks/';



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function removeSpaces(searchState){
    return searchState.split(' ').join('');
}



function displayResults(npsJson) {
  
  console.log(npsJson);
  $('#results-list').empty();

  for (let i = 0; i < npsJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${npsJson.data[i].fullName}</h3>
      <p>${npsJson.data[i].description}</p>
      <a href='${npsJson.data[i].url}' target="_blank">Link to National Park</a>
      </li>`
    )};
   
  $('#results').removeClass('hidden');
};



function getNps(query, maxResults=10) {
  const params = {
    stateCode: query,
    limit: maxResults,
    api_key: api_key,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(nps => {
      if (nps.ok) {
        return nps.json();
      }
      throw new Error(nps.statusText);
    })
    .then(npsJson => displayResults(npsJson))
    .catch(err => {
      $('#js-error-message').text(`Opps!: ${err.message}`);
    });
}

function watchForm() {
        $('form').submit(event => {
          event.preventDefault();
          const searchState = removeSpaces($('#js-search-state').val());
          const maxResults = $('#js-max-results').val();
          console.log(maxResults);
          getNps(searchState, maxResults);
        });
}


$(watchForm);
