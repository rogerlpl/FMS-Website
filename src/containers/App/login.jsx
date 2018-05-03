import React from 'react'
import stylesheet from "../../assets/css/material-kit.css?v=2.0.2"
import { withStyles } from "material-ui";
import background from '../../assets/img/caribe_background.jpg'
import logo from "assets/img/I-trackLogo.png";

import { connect } from 'react-redux'
import * as actions from '../../actions/actions-creators'
import { bindActionCreators } from 'redux'

import { push } from 'react-router-redux'

import passwordHash from 'password-hash'

import Danger from '../../components/Typography/Danger'

class Login extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault()
    const $form = document.getElementById('form')

    const data = new FormData($form)
    const user = data.get('user')
    const password = data.get('password')

    // const options = {
    //   algorithm: 'sha512',
    //   saltLength: 20,
    //   iterations: 5
    // }
    //const hashedpassword = passwordHash.generate(password, options)

    await this.props.actions.fetchUserData(user)

    const passwordIsCorrect = passwordHash.verify(password, this.props.userData.hashedpassword)
    console.log(password + ' ' + passwordIsCorrect)
    if (passwordIsCorrect) {
      this.props.actions.toggleUserLogging()
      this.props.actions.loggingFailed(false)
      this.props.redirect('/estadisticas')
    } else {
      this.props.actions.loggingFailed(true)
    }


  }

  render() {
    return (
      <div className='signup-page'>

        {/*     Fonts and icons     */}
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

        {/* Documentation extras */}
        <nav className='navbar navbar-transparent navbar-absolute navbar-expand-lg' color-on-scroll={100} id="sectionsNav">
          <div className="container">
            <div className="navbar-translate">
              <a href="/">
                <img src={logo} style={{ width: 100, paddingBottom: 60, display: '"inline-block"' }} alt="logo" />
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                <span className="navbar-toggler-icon" />
                <span className="navbar-toggler-icon" />
              </button>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="signup-page.html" >
                    <i className="material-icons">person</i> Iniciar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="page-header header-filter" filter-color="purple" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-10 ml-auto mr-auto">
                <div className="card card-signup">
                  <h2 className="card-title text-center">Iniciar sesión</h2>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5 ml-auto">
                        <div className="info info-horizontal">
                          <div className="icon icon-rose">
                            <i className="material-icons">timeline</i>
                          </div>
                          <div className="description">
                            <h4 className="info-title">Métricas</h4>
                            <p className="description">
                              Tome las mejores decisiones para su negocio, con nuestras graficas y reportes en tiempo real.
                            </p>
                          </div>
                        </div>
                        <div className="info info-horizontal">
                          <div className="icon icon-primary">
                            <i className="material-icons">my_location</i>
                          </div>
                          <div className="description">
                            <h4 className="info-title">Rastreo y visualizacion de flotas</h4>
                            <p className="description">
                              Rastree y visualice lo que sucede en sus flotas vehiculares en tiempo real.
                            </p>
                          </div>
                        </div>
                        <div className="info info-horizontal">
                          <div className="icon icon-info">
                            <i className="material-icons">group</i>
                          </div>
                          <div className="description">
                            <h4 className="info-title">Soporte técnico</h4>
                            <p className="description">
                              Estamos para hacer que sus dificultades en la plataforma desaparezcan, mejorar su rendimiento y aumentar su productividad.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 mr-auto">

                        <form id='form' className="form" onSubmit={this.handleSubmit} style={{ paddingTop: '50%' }}>

                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">person</i>
                                </span>
                              </div>
                              <input type="text" name="user" className="form-control" placeholder="Usuario..." />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="material-icons">lock_outline</i>
                                </span>
                              </div>
                              <input type="password" name="password" placeholder="Contraseña..." className="form-control" />
                            </div>
                          </div>
                          { this.props.loggingFailed &&
                            <div className="text-center" style={{ paddingLeft: 15 }}>
                              <Danger>
                                El usuario o la contraseña es incorrecto, contacte con su administrador en caso de que se le haya olvidado.
                            </Danger>
                            </div>
                          }
                          <div className="text-center">
                            <input type='submit' className="btn btn-primary btn-round" style={{ color: 'white' }} value='Iniciar Sesión' />
                          
                          </div>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer ">
            <div className="container">
              <div className="copyright pull-right">
                © 2018, Creado por
                <a href="http://www.imecap.com.do" target="_blank" rel='noopener noreferrer'> IMECAP</a>
              </div>
            </div>
          </footer>
        </div>

        {/* <!--   Core JS Files   --> */}
        <script src="/../../assets/js/core/jquery.min.js"></script>
        <script src="/../../assets/js/core/popper.min.js"></script>
        <script src="/../../assets/js/bootstrap-material-design.js"></script>
        {/* <!-- Material Kit Core initialisations of plugins and Bootstrap Material Design Library --> */}
        <script src="/../../assets/js/material-kit.js?v=2.0.2"></script>
      </div>
    );
  }
}


function mapStateToProps(state, props) {

  return {
    userData: state.getIn(['user', 'data']),
    loggingFailed: state.getIn(['user', 'loggingFailed']),
  }

}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    redirect: bindActionCreators(push,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(stylesheet)(Login)) 