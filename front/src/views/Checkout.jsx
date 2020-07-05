import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { CartContext } from "providers/CartProvider.jsx";

const Checkout = () => {
  let totalSum = 0;
  const thead = ["Nombre", "Cantidad", "Precio Unitario", "Total"];
  const [cart, setCart] = useContext(CartContext);
  const comfirmOrder = () => {
    setCart([]);
  }
  const cancelOrder = () => {
    setCart([]);
  }
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Desglose de venta</CardTitle>
              </CardHeader>
              <CardBody>
                {cart.length !== 0 ?
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        {thead.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((product, key) => {
                        totalSum += (product.price * product.items);
                        return (
                          <tr key={key}>
                            <td key={`${key}A`}>{product.name}</td>
                            <td key={`${key}B`}>{product.items}</td>
                            <td key={`${key}C`}>Lps. {product.price}</td>
                            <td key={`${key}D`}>Lps. {product.price * product.items}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td><b>TOTAL A PAGAR</b></td>
                        <td><b>-</b></td>
                        <td><b>-</b></td>
                        <td><b>Lps. {totalSum}</b></td>
                      </tr>
                    </tbody>
                  </Table>
                  :
                  <h3>No hay elementos en el carrito.</h3>
                }
              </CardBody>
              {cart.length !== 0 ?
                <CardFooter style={{ float: "right" }}>
                  <Button
                    className="btn-round"
                    color="success"
                    onClick={comfirmOrder}
                  >Confirmar</Button>{" "}
                  <Button
                    className="btn-round"
                    color="danger"
                    onClick={cancelOrder}
                  >Cancelar</Button>
                </CardFooter> : null
              }
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Checkout;