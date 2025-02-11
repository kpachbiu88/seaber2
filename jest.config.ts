import { createDefaultPreset, JestConfigWithTsJest } from 'ts-jest';

const defaultPreset = createDefaultPreset();

const config: JestConfigWithTsJest = {
  ...defaultPreset,
};

export default config;
