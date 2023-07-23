export interface User {
  execute: (id: string) => Promise<any>;
}
export const USER = Symbol("USER");
