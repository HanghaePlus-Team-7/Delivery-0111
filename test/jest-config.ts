import type { Config } from "jest";
export const jestConfig: Config = {
  verbose: true,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "^@root/(.*)$": "<rootDir>/../../src/$1",
    "^@cart/(.*)$": "<rootDir>/../../src/modules/cart/$1",
    "^@order/(.*)$": "<rootDir>/../../src/modules/order/$1",
    "^@products/(.*)$": "<rootDir>/../../src/modules/products/$1",
    "^@reviews/(.*)$": "<rootDir>/../../src/modules/reviews/$1",
    "^@store/(.*)$": "<rootDir>/../../src/modules/store/$1",
    "^@user/(.*)$": "<rootDir>/../../src/modules/user/$1",
    "^@auth/(.*)$": "<rootDir>/../../src/modules/auth/$1",
    "^@notification/(.*)$": "<rootDir>/../../src/modules/notification/$1",
  },
};
