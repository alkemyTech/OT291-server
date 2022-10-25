const axios = require('axios');

class HttpAdapter {
  static instance = axios.create({
    Headers: {
      'Content-Type': 'application/json',
    },
  });
  static async get(url) {
    try {
      const data = await HttpAdapter.instance.get(url);
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async post(url, body, Authorization) {
    try {
      const data = await HttpAdapter.instance.post(url, body, {
        headers: {
          Authorization: `Bearer ${Authorization}`,
        },
      });
      return data.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
}

module.exports = HttpAdapter;
