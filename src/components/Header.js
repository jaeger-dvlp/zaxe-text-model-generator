import React, {Component} from 'react'

export default class Header extends Component {
  redirectToWebsite = () => {
    window.location.href = 'https://zaxe.com'
  }
  render() {
    return (
      <div
        data-aos="fade-down"
        className="col-12 bg-light header p-3 d-flex justify-content-center"
      >
        <div className="logo mx-auto" onClick={this.redirectToWebsite}></div>
      </div>
    )
  }
}
