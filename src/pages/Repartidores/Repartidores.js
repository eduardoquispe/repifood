import HeaderPage from '../../components/Layout/HeaderPage';
import './Repartidores.scss';

const Repartidores = () => {
  return ( 
    <div className="Repartidores">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">REPARTIDORES</h2>
          </div>
        </div>
      </HeaderPage>
    </div>
  );
}

export default Repartidores;