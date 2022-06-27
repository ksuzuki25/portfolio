module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
  },
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './html-report/report.html',
        pageTitle: 'TodoListAppバックエンド Unitテストレポート',
        filename: 'report.html',
        styleOverridePath: './custom.css',
        customScriptPath: './custom.js',
        theme: 'defaultTheme',
        useCssFile: false,
      },
    ],
  ],
  preset: '@shelf/jest-dynamodb',
}
