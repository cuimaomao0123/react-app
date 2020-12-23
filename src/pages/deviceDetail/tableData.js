export const columns = [
  {
    title: 'A',
    dataIndex: 'key',
    width: 150,
    align: 'center'
  },
  {
    title: 'B',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: 'C',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: 'D',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: 'E',
    dataIndex: 'key',
    width: 200,
    align: 'center'
  },
  {
    title: 'F',
    dataIndex: 'key',
    width: 100,
    align: 'center'
  },
];
export const data = Array.from(
  {
    length: 800000,
  },
  (_, key) => ({
    key,
  }),
);
