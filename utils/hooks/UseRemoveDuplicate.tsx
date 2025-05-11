// import { field_jobs } from '@/interfaces/types';

export const UseRemoveDuplicate = (data: any[]): any => {
  const uniqueProducts = data.reduce((accumulator: any, current: any) => {
    const isDuplicate = accumulator.some(
      (item: any) => item.slug === current.slug
    );
    if (!isDuplicate) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
  return uniqueProducts;
};
