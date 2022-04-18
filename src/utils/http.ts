import axios from './request';

export function formPost(url: any, data: any) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url: url,
      data: data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function resPost(url: any, query: any, data: any) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: url,
            params: query,
            data,
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    });
}