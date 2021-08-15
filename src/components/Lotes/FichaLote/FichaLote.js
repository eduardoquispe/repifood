import { useState, useEffect } from "react";
import { useRef } from "react";
import { Modal, Button } from "semantic-ui-react";
import FormLote from "../FormLote";

const FichaLote = ({ setOpenModal, resultLoadFicha, requestDataIfNeeded }) => {

  const formRef = useRef(null);
  const [almacenes, setAlmacenes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loteData, setLoteData] = useState({});

  const handleSubmit = () => {
    formRef.current.handleSubmit();
  }

  useEffect(() => {
    (async () => {
      setAlmacenes(resultLoadFicha.almacenes.data);
      setProductos(resultLoadFicha.productos.data);
      setLoteData(resultLoadFicha.loteData);
    })()
  }, [])

  return ( 
    <>
      <Modal.Header>
        {loteData.idLote ? 'Editar Lote' : 'Nuevo Lote'}
      </Modal.Header>
      <Modal.Content>
        <FormLote 
          formRef={formRef}
          almacenes={almacenes}
          productos={productos}
          loteData={loteData}
          setOpenModal={setOpenModal}
          requestDataIfNeeded={requestDataIfNeeded}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
        <Button onClick={handleSubmit} primary>Guardar</Button>
      </Modal.Actions>
    </>
  );
}
 
export default FichaLote;