// 拡張子が「.d.ts」のファイルはTypeScriptの型定義ファイルとして認識される
declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
