

export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/v1/login';


  const config = {
    method: 'post',
    url: `${consts.WORKLIST_API}/token`,
    data : {
      'username': 'be_min', 
      'password': '1',
    }
  };

  return fetch(LOGIN_API_ENDPOINT, config)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};