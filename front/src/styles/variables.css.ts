import { createTheme } from '@vanilla-extract/css'

/**
 * 共通スタイルのうち、変数として制御されるものを管理
 * ・layoutでbaseThemeを読み込ませなければ適用されない
 * ・layoutでの適用後に各コンポーネントなどでvariableStyleから利用すること
 */
export const [baseTheme, variableStyle] = createTheme({
  width: {
    baseContent: '1000px',
    formInputTitle: '200px',
  },
  height: {
    header: '50px',
    popupHeader: '40px',
  },
  margin: {
    formBottom: '5px',
  },
  color: {
    baseColor1: '#010440',
    baseColor2: '#222940',
    baseColor3: '#F2CE16',
    baseColor3A: `#F2CE16` + 'DD',
    baseColor4: '#F2BC1B',
    baseColor5: '#F2D785',
    placeholderColor: '#989898',
    changedForm: '#f2ce1642',
  },
})
