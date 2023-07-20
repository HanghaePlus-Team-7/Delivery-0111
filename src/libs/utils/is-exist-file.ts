import fs from "fs";

/**
 * @description 파일이 존재하는지 확인하는 함수
 * @param filePath 파일 경로
 * @returns 파일이 존재하면 true, 존재하지 않으면 false
 * @example isExistFile(`${__dirname}/test.png`); // true
 */
export const isExistFile = (filePath: string): boolean => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};
