// web workerを実装するファイル
import * as marked from 'marked'
import * as sanitizeHtml from 'sanitize-html'

const worker: Worker = self as any

worker.addEventListener('message', (event) => {
  const text = event.data
  // markedでHTMLに変換
  const html = sanitizeHtml(marked(text), { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2'] })
  // メインスレッドに結果のHTMLを返却
  worker.postMessage({ html })
})
