import './Header.scss';
import { FaBars, FaPowerOff, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import ModalUsuario from '../../Usuario/ModalUsuario';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/authActions';
import Notiflix from 'notiflix';

const Header = ({ handleCollapsedChange }) => {

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();

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
        <div className="nav-content left">
          <div className="btn-toggle ui item" onClick={() => handleCollapsedChange()}>
            <FaBars />
          </div>
        </div>
        <div className="nav-content right menu colhidden">
          <div className="ui item" onClick={() => setOpen(true)}>
            <p className="name-user">
              <FaUserCircle />&nbsp;&nbsp;Eduardo Quispe Huancahuari
            </p>
          </div>
          <div className="btn-toggle ui item" onClick={() => handleLogout()}>
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