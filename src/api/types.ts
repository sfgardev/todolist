export type ResponseType<T = {}> = {
  data: T;
  fieldErrors: string[];
  messages: string[];
  resultCode: number;
};
