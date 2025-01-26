import { http, HttpResponse } from 'msw';

const getData = (pageIndex, size, formData) => {
  return Array.from(new Array(size)).map((_, i) => ({
    key: pageIndex * size + i,
    name: `${formData?.name || 'name'} ${pageIndex * size + i}`,
    age: pageIndex * size + i,
    address: `${formData?.address || 'shanghai'} ${pageIndex * size + i}`,
  }));
};

export const handlers = [
  http.post('/api/users', async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const size = url.searchParams.get('size') || 10;
    const formData = await request.json();

    const dataSource = getData(Number(page) - 1, Number(size), formData);

    return HttpResponse.json({
      list: dataSource,
      total: 100,
    });
  }),
];
