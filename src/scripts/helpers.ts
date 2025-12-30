export const generateId = function (): number {
  return Date.now();
};

export const checkLocationHash = function () {
  return window.location.hash.slice(1).trim();
};
