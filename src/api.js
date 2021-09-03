const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: keyword => {
    return fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(
      res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('서버 오류')
        }
      }
    );
  },
  fetchRandomCat: () => {
    return fetch(`${API_ENDPOINT}/api/cats/random50`).then(
      res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('서버 오류')
        }
      }
    )
  },
  fetchCat: async id => {
    return await fetch(`${API_ENDPOINT}/api/cats/${id}`).then(res => {
      if(res.ok) {
        return res.json()
      } else {
        throw new Error('서버 오류')
      }
    }
      
    )
  }
};
