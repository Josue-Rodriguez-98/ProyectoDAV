import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { header, products } from "variables/productos";

const AdminProductos = () => {
  const [productId, setProductId] = useState(-1);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [list, setList] = useState(products)
  const [orderModal, setOrderModal] = useState(false);
  const toggleOrderModal = () => setOrderModal(!orderModal);
  const addProduct = () => {
    let newProduct = {
      id: Math.random(),
      name: productName,
      price: productPrice,
      quantity: productQuantity,
    }
    setList([...list, newProduct]);
    const endpoint = "localhost";
    const port = 6969;
    
    const ws = new WebSocket(`ws://${endpoint}:${port}`);

    const dummyTransaction = {
      transaction: {
        type: 1,
        prodId: newProduct.id,
      },
      publicKey: "publicKey",
      idClient: "uid",
      hash: "hash",
      transId: "transuid",
    }

    ws.addEventListener("open", function () {
      console.log("Sucursal conectada");
    
      ws.addEventListener("message", (m) => {
        console.log(m.toString());
      });
    
      const sendData = (data) => {
        ws.send(data);
      };
    
      sendData(JSON.stringify({ data: 1 }));
    })
    setProductName("");
    setProductQuantity(0);
    setProductPrice(0.0);
    setProductId(-1)
    toggleOrderModal();
  }
  const removeProduct = (productId) => {
    setList(list.filter(product => { return product.id !== productId }))
  }
  const updateProduct = () => {
    let updatedProduct = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
    }
    const tempList = list.filter(product => { return product.id !== productId });
    tempList.push(updatedProduct);
    setList(tempList);
    setProductName("");
    setProductQuantity(0);
    setProductPrice(0.0);
    setProductId(-1);
    toggleOrderModal();

  }
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Administrar productos disponibles</CardTitle>
              </CardHeader>
              <CardBody>
                <Button
                  color="info"
                  className="btn-round"
                  onClick={toggleOrderModal}
                >
                  Agregar producto
                </Button>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {header.map((prop, key) => {
                        if (key === header.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((product, key) => {
                      return (
                        <tr key={key}>
                          <td key={`${key}A`}>{product.name}</td>
                          <td key={`${key}B`}>{product.quantity}</td>
                          <td key={`${key}C`} className="text-right">
                            Lps. {product.price}
                          </td>
                          <td key={`${key}D`}>
                            <Button
                              className="btn-round"
                              color="warning"
                              onClick={() => {
                                setProductName(product.name);
                                setProductPrice(product.price);
                                setProductQuantity(product.quantity);
                                setProductId(product.id);
                                toggleOrderModal();
                              }}
                            >Modificar</Button>{" "}
                            <Button
                              className="btn-round"
                              color="danger"
                              onClick={() => { removeProduct(product.id) }}
                            >Borrar</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={orderModal} toggle={toggleOrderModal}>
          {productId === -1 ?
            <ModalHeader toggle={toggleOrderModal}>Agregar Producto</ModalHeader> :
            <ModalHeader toggle={toggleOrderModal}>Modificar Producto</ModalHeader>
          }
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                e.persist();
                toggleOrderModal();
              }}>
              <FormGroup>
                <Label for="productCode">Nombre de producto</Label>
                <Input
                  type="text"
                  name="productName"
                  id="productName"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value)
                  }}
                  placeholder="Nombre de producto"
                />
              </FormGroup>
              <FormGroup>
                <Label for="productQuantity">Cantidad</Label>
                <Input
                  type="number"
                  name="productQuantity"
                  id="productQuantity"
                  value={productQuantity}
                  onChange={(e) => {
                    setProductQuantity(e.target.value)
                  }}
                  placeholder="##"
                />
              </FormGroup>
              <FormGroup>
                <Label for="productQuantity">Precio</Label>
                <Input
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => {
                    setProductPrice(e.target.value)
                  }}
                  placeholder="##"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {productId === -1 ?
              <Button
                color="success"
                className="btn-round"
                onClick={addProduct}
              >
                Agregar
              </Button> :
              <Button
                color="success"
                className="btn-round"
                onClick={updateProduct}
              >
                Guardar
              </Button>
            }
            <Button
              color="danger"
              className="btn-round"
              onClick={() => {
                setProductId(-1);
                setProductName("");
                setProductQuantity(0);
                setProductPrice(0.0);
                toggleOrderModal();
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default AdminProductos;