export const generateId = function (): number {
  return Date.now();
};

export const checkLocationHash = function () {
  return window.location.hash;
};

export const slicedLocationHash = function () {
  const path = checkLocationHash();
  return path.slice(1).trim();
};
