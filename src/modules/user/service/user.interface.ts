export interface User {
  execute: (id: bigint) => Promise<any>;
}
export const USER = Symbol("USER");
