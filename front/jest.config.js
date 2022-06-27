const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // next.config.jsとテスト環境用の.envファイルが配置されたディレクトリをセット。基本は"./"で良い。
  dir: './',
})

// Jestのカスタム設定を設置する場所。従来のプロパティはここで定義。
const customJestConfig = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupJest.ts'],
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    // aliasを定義 （tsconfig.jsonのcompilerOptions>pathsの定義に合わせる）
    '^@/(.*)/(.*)$': '<rootDir>/src/$1/$2',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^modern-css-reset$': 'identity-obj-proxy',
    '^uuid$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './html-report/report.html',
        pageTitle: 'TodoListAppフロント Unitテストレポート',
        filename: 'report.html',
        styleOverridePath: './custom.css',
        customScriptPath: './custom.js',
        theme: 'defaultTheme',
        useCssFile: false,
      },
    ],
  ],
  moduleDirectories: ['node_modules', 'src'],
}

// createJestConfigを定義することによって、本ファイルで定義された設定がNext.jsの設定に反映されます
module.exports = createJestConfig(customJestConfig)
