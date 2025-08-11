import axios from 'axios';

const getGateWayPath = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '/book-engine-dev';
    case 'qa':
      return '/book-engine-qa';
    case 'uat':
      return '/book-engine-uat';
    case 'production':
      return '/book-engine';
    default:
      return '/book-engine';
  }
};

const req = axios.create({
  baseURL: getGateWayPath(),
  withCredentials: true,
});

export default req;
