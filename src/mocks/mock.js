import { http, HttpResponse } from 'msw';

const getData = (page, size) => {
  return Array.from(new Array(10)).map((_, i) => ({
    key: page * size + i,
    name: `name ${page * size + i}`,
    age: page * size + i,
    address: `shanghai, minhang. ${page * size + i}`,
  }));
};

export const handlers = [
  http.post('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const size = url.searchParams.get('size') || 10;

    const dataSource = getData(Number(page), Number(size));

    return HttpResponse.json({
      list: dataSource,
      total: 100,
    });
  }),
];
