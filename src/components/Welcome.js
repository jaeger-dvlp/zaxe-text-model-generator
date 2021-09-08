import React, {Component} from 'react'

export default class Welcome extends Component {
  render() {
    return (
      <div className="col-12 d-flex row m-0 text-center welcome">
        <span>Merhaba.</span>
        <span style={{fontSize: 'calc(0.1vw + 1rem)'}}>
          Adınızı girerek size özel anahtarlığınızı alabilirsiniz.
        </span>
        <div className="col-12 text-center arrow-tip">
          <i className="fas fa-angle-down"></i>
        </div>
      </div>
    )
  }
}
