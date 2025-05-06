import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '\\.tsx?': 'ts-jest'
  }
};

export default config;
