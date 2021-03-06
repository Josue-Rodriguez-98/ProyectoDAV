import React, { useState, useContext } from "react";
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
import { CartContext } from "providers/CartProvider";

const Productos = () => {
  const [cart, setCart] = useContext(CartContext);
  const [orderModal, setOrderModal] = useState(false);
  const [queryModal, setQueryModal] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0)
  const [productCode, setProductCode] = useState("");
  const toggleOrderModal = () => setOrderModal(!orderModal);
  const toggleQueryModal = () => setQueryModal(!queryModal);
  const addProduct = (productId) => {
    if (cart.findIndex(product => product.id === productId) !== -1) {
      setCart(cart.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            items: product.items + 1
          }
        }
        return product;
      }))
    } else {
      const result = products.filter(product => { return product.id === productId })[0];
      setCart([...cart, { items: 1, ...result }]);
    }
  }
  const removeProduct = (productId) => {
    if (cart.findIndex(product => product.id === productId) !== -1) {
      const { items, ...result } = cart.filter(product => { return product.id === productId })[0];
      const temp = cart.filter(product => { return product.id !== productId });
      setCart(temp)
      if (items > 1) {
        setCart([...temp, { items: items - 1, ...result }])
      }
    }
  }
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Productos disponibles</CardTitle>
              </CardHeader>
              <CardBody>
                <Button
                  color="info"
                  className="btn-round"
                  onClick={toggleOrderModal}
                >
                  Hacer pedido
                </Button>
                <Button
                  color="primary"
                  className="btn-round"
                  onClick={toggleQueryModal}
                >
                  Consultar producto en almacen
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
                    {products.map((product, key) => {
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
                              color="success"
                              onClick={() => { addProduct(product.id) }}
                            >+</Button>{" "}
                            <Button
                              className="btn-round"
                              color="danger"
                              onClick={() => { removeProduct(product.id) }}
                            >-</Button>
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
          <ModalHeader toggle={toggleOrderModal}>Hacer pedido</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                e.persist();
                toggleOrderModal();
              }}>
              <FormGroup>
                <Label for="productCode">Código de Producto</Label>
                <Input
                  type="text"
                  name="productCode"
                  id="productCode"
                  value={productCode}
                  onChange={(e) => {
                    setProductCode(e.target.value)
                  }}
                  placeholder="######"
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
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              className="btn-round"
              onClick={() => {
                console.log(`Código: ${productCode} Cantidad: ${productQuantity}`)
                setProductCode("");
                setProductQuantity(0);
                toggleOrderModal();
              }}
            >
              Enviar pedido
            </Button>
            <Button
              color="danger"
              className="btn-round"
              onClick={() => {
                setProductCode("");
                setProductQuantity(0);
                toggleOrderModal();
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={queryModal} toggle={toggleQueryModal}>
          <ModalHeader toggle={toggleQueryModal}>Consultar producto en almacen</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                e.persist();
                toggleQueryModal();
              }}>
              <FormGroup>
                <Label for="productCode">Código de Producto</Label>
                <Input
                  type="text"
                  name="productCode"
                  id="productCode"
                  value={productCode}
                  onChange={(e) => {
                    setProductCode(e.target.value)
                  }}
                  placeholder="######"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              className="btn-round"
              onClick={() => {
                console.log(`Código: ${productCode}`)
                setProductCode("");
                toggleQueryModal();
              }}
            >
              Enviar consulta
            </Button>
            <Button
              color="danger"
              className="btn-round"
              onClick={() => {
                setProductCode("");
                toggleQueryModal();
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

export default Productos;