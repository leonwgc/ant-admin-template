declare global {
  const MOCK: boolean;

  interface TableDataResult<T> {
    total: number;
    list: T[];
  }

  interface FormData {
    [key: string]: unknown;
  }
}
export {};
