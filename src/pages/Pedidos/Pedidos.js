import HeaderPage from "../../components/Layout/HeaderPage"

const Pedidos = () => {
  return ( 
    <div className="Pedidos">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">PEDIDOS</h2>
          </div>
        </div>
      </HeaderPage>
    </div>
  );
}
 
export default Pedidos;