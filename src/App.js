import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ScriptTag from 'react-script-tag'
import Header from './components/Header.js'
import Welcome from './components/Welcome.js'
import ThreeDArea from './components/ThreeDArea'

function App() {
  return (
    <div className="App">
      <ScriptTag
        type="text/javascript"
        src="https://kit.fontawesome.com/a5c523402b.js"
      />
      <Header></Header>
      <div className="container p-3 text-center">
        <Welcome></Welcome>

        <ThreeDArea></ThreeDArea>
      </div>
    </div>
  )
}

export default App
