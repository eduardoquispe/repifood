import { FaBars, FaPowerOff, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import ModalUsuario from '../../Usuario/ModalUsuario';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/authActions';
import Notiflix from 'notiflix';
import LogoHeader from '../../../assets/img/layout/logo_header.png';
import './Header.scss';
import { getDataOperador } from '../../../actions/operadorActions';

const Header = ({ handleCollapsedChange, handleToggleSidebar }) => {

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const { user = {} } = useSelector(state => state.auth);

  const handleShowOperador = () => {
    dispatch(getDataOperador(user.idOperador, setOpen));
  }

  const handleLogout = () => {
    Notiflix.Confirm.show(
      'Sistema',
      '¿Desea cerrar sesión?',
      'Si',
      'Cancelar',
      function(){
        dispatch(logout());
      }
    );
  }

  return ( 
    <>
    <nav className="nav">
      <div className="nav-content ui menu">
        <div className="nav-content menu left">
          <div className="btn-toggle ui item" onClick={() => handleCollapsedChange()}>
            <FaBars />
          </div>
          <div className="btn-toggle ui item responsive" onClick={() => handleToggleSidebar()}>
            <FaBars />
          </div>
          <div className="ui item">
            <img className="app-logo" src={LogoHeader} alt="logo" />
          </div>
        </div>
        <div className="nav-content right menu colhidden">
          <div className="ui item item--user" onClick={handleShowOperador}>
            <p className="name-user">
              <FaUserCircle />&nbsp;&nbsp;{user.nombres} {user.apellidos}
            </p>
          </div>
          <div className="power-off ui item" onClick={() => handleLogout()}>
            <FaPowerOff />
          </div>
        </div>
      </div>
    </nav>
    <ModalUsuario 
      open={open}
      setOpen={setOpen}
    />
    </>
  );
}

export default Header;