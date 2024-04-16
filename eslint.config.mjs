// @ts-check
import tseslint from 'typescript-eslint'
import esjs from '@eslint/js'
import jest from 'eslint-plugin-jest'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'

export default tseslint.config(
  esjs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      jest: jest,
    },
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  ...new FlatCompat().extends('prettier'),
  {
    ignores: ['node_modules', 'dist', 'coverage'],
  }
)
