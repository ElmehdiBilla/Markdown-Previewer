import Editor from './components/Editor'
import Previewer from './components/Previewer'
import {Provider} from 'react-redux'
import store from './store/store'
import Controls from './components/Controls'

function App() {
  return (
    <Provider store={store}>
      <Controls />
      <main>
        <Editor />
        <Previewer/>
      </main>
    </Provider>
  )
}

export default App
