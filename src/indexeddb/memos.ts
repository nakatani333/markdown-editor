import Dexie from 'dexie'

// データの型を定義（TypeScript用）
export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

//テーブルを定義　DB名「markdown-editor」
const database = new Dexie('markdown-editor')
database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text })
}

const NUM_PER_PAGE: number = 10

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  return pageCount > 0 ? pageCount : 1
}

// この関数が呼び出されたら非同期処理になる？この関数が呼び出されている間に他の処理が走ってるってこと？
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datetime')
    // 並び順を逆にする。保存した日時を新しい順に変更。
    .reverse()
    // 取得するリスト内の開始位置を設定
    .offset(offset)
    // 取得する件数を設定
    .limit(NUM_PER_PAGE)
    // データを取得
    .toArray()
}
