import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from './pages/history'
import { useStateWithStorage } from './hooks/use_state_with_storage'


const GlobalStyle = createGlobalStyle`
  body * {
      box-sizing:border-box;
    }
  `

// const Main = (
//   <>
//     <GlobalStyle />
//     <Router>
//       {/* exact と exact={true} は同じ意味
//       exact={true}は完全一致、exact={false}は部分一致 */}
//       <Route exact path="/editor">
//         <Editor />
//       </Route>
//       <Route exact path="/history">
//         <History />
//       </Route>
//       <Redirect to="/editor" path="*" />
//     </Router>
//   </>
// )
const StorageKey = '/editor:text'

const Main: React.FC = () => {
  const [text, setText] = useStateWithStorage('', StorageKey)

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/editor">
            <Editor
              text={text}
              setText={setText}
            />
          </Route>
          <Route exact path="/history">
            <History
              setText={setText}
            />
          </Route>
          <Redirect to="/editor" path="*" />
        </Switch>
      </Router>
    </>
  )
}
// app という ID を持つ HTML 内の要素に対して Main という変数の内容を紐付ける処理
render(<Main />, document.getElementById('app'))
