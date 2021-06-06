import HeaderPage from "../../components/Layout/HeaderPage";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import { Button, Dropdown } from "semantic-ui-react";
import { FaPlus } from "react-icons/fa";
import BusquedaCliente from "../../components/Clientes/BusquedaCliente";
import useLoaderTable from "../../hooks/useLoaderTable";

const Clientes = () => {

  const { dataResul, dataState, dataStateChange, requestDataIfNeeded } = useLoaderTable();

  const handleClick = () => {
    requestDataIfNeeded(true);
  } 

  return (
    <div className="Clientes">
      <HeaderPage>
        <div className="item ui colhidden">
          <div className="ui big breadcrumb">
            <i className="right chevron icon divider"></i>
            <h2 className="section active">CLIENTES</h2>
          </div>
        </div>
        <div className="item ui colhidden">
            <Button icon primary onClick={() => handleClick()}>
              <FaPlus /> Nuevo Cliente
            </Button>
          </div>
          <div className="right menu colhidden">
            <div className="item ui colhidden">
              <BusquedaCliente />
            </div>
          </div>
      </HeaderPage>
      <div className="Cliente__body app__container_body">
        <div className="Clientes__tabla">
          <Grid
              sortable={true}
              pageable={true}
              style={{ height: '710px' }}
              {...dataState}
              {...dataResul}
              onDataStateChange={dataStateChange}
            >
              <Column
                width={50}
                cell={(props) => (
                  <td>
                    <input
                      disabled={true}
                      type="checkbox"
                      // checked={props.dataItem[props.field || ""]}
                    />
                  </td>
                )}
              />
              <Column field="ProductID" filter="numeric" title="Id" />
              <Column field="ProductName" title="Name" />
              <Column
                field="UnitPrice"
                filter="numeric"
                format="{0:c}"
                title="Price"
              />
              <Column field="UnitsInStock" filter="numeric" title="In stock" />
            </Grid>
        </div>
      </div>
    </div>
  );
}

export default Clientes;