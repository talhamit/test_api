export const generateLargeData = () => {
  return Array.from({ length: 20000 }).map((_, i) => ({
    id: i,
    name: `Item-${i}`,
    price: Math.floor(Math.random() * 1000),
  }));
};
