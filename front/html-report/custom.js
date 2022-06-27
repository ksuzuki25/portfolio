// ファイルパスの整形
const suits = document.getElementsByClassName('suite-path')
for (let suit of suits) {
  suit.textContent = suit.textContent.match('.*(/app/src/.*)$')[1]
}

// 各テスト結果の制御
const targets = document.getElementsByClassName('test-result')
for (let target of targets) {
  target.addEventListener('click', (e) => {
    const target = e.currentTarget
    if (target.classList.contains('test-result')) {
      if (target.classList.contains('is-open')) {
        target.classList.remove('is-open')
      } else {
        target.classList.add('is-open')
      }
    }
  })
}
