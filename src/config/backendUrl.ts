export const backendUrl = () => {
  if (process.env.NODE_ENV !== 'development') {
    return 'https://viridian-bee-tie.cyclic.app';
  } else {
    return 'http://localhost:5000';
  }
};
