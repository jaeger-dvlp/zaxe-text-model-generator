import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
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
      <div
        data-aos="fade-in"
        data-aos-easing="ease-in-sine"
        data-aos-delay="300"
        className="container p-3 text-center"
      >
        <Welcome></Welcome>

        <ThreeDArea />
      </div>
      {AOS.init({
        startEvent: 'DOMContentLoaded',
        easing: 'ease-out-back'
      })}
    </div>
  )
}

export default App
