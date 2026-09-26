import CountModel, { ICount } from '@/models/Count';

export async function getCountDoc() {
  const doc = await CountModel.findOne().lean<ICount>();
  return {
    randomData: doc ? doc.random : 1,
    randomCount: doc ? doc.count : 0,
  };
}