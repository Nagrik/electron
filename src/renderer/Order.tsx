import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Ballot from './icons/Ballot';
import { OrderType } from '../types/order';

type Product = {
  CategoryID: number;
  Discontinued: number;
  Discount: string;
  OrderID: number;
  OrderUnitPrice: string;
  ProductID: number;
  ProductName: string;
  ProductUnitPrice: string;
  Quantity: number;
  QuantityPerUnit: string;
  ReorderLevel: number;
  SupplierID: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
};

const Order = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const goBack = () => {
    navigation('/orders');
  };
  const [orderData, setOrderData] = useState<OrderType | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);

  const domain = window.localStorage.getItem('domain');
  useEffect(() => {
    if (domain) {
      axios.get(`${domain}/order?id=${id}`).then((res: any) => {
        setOrderData(res.data.data);
        res.data.data.Products.forEach((product: Product) => {
          setTotalQuantity((prev) => prev + product.Quantity);
          setTotalDiscount((prev) => prev + Number(product.Discount));
        });
      });
    } else {
      window.api.orders.getOrder(id!).then((data) => {
        console.log('Data: ', data.data[0]);
        setOrderData(data.data[0]);
      });
    }
    return () => {
      window.api.removeAllListeners('getOrder');
    };
  }, [domain, id]);

  return (
    <Wrapper>
      {orderData ? (
        <>
          <Body>
            <Header>
              <Ballot />
              <HeaderTitle>Supplier information</HeaderTitle>
            </Header>
            <BodyContent>
              <BodyContentLeft>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Customer ID
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    <Link to={`/customer/${orderData.CustomerID}`}>
                      {orderData.CustomerID}
                    </Link>
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Ship Name</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {orderData.ShipName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Total Products
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {orderData.Products && orderData.Products.length}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Total Quantity
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {totalQuantity}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Total Price
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    ${orderData.TotalPrice}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Total Discount
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {totalDiscount}$
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Ship Via</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {orderData.ShipVia}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Freight</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    ${orderData.Freight}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentLeft>

              <BodyContentRight>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Order Date
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {format(new Date(orderData.OrderDate), 'yyyy-LL-dd')}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Required Date
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {format(new Date(orderData.RequiredDate), 'yyyy-LL-dd')}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Shipped Date
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {format(new Date(orderData.ShippedDate), 'yyyy-LL-dd')}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Ship City</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {orderData.ShipCity}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Ship Region
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {orderData.ShipRegion}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Ship Postal Code
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {orderData.ShipPostalCode}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Ship Country
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {orderData.ShipCountry}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentRight>
            </BodyContent>
          </Body>
          <TableWrapper>
            <TableHeader>Products in Order</TableHeader>
            <Table>
              <TableHeaderRow>
                <TableHeaderRowItem1>Product</TableHeaderRowItem1>
                <TableHeaderRowItem2>Quantity</TableHeaderRowItem2>
                <TableHeaderRowItem3>Order Price</TableHeaderRowItem3>
                <TableHeaderRowItem4>Total Price</TableHeaderRowItem4>
                <TableHeaderRowItem5>Discount</TableHeaderRowItem5>
              </TableHeaderRow>
              <TableBody>
                {orderData.Products &&
                  orderData.Products.map((product: Product) => (
                    <TableBodyRow>
                      <TableBodyRowItem1>
                        <Link to={`/product/${product.ProductID}`}>
                          {product.ProductName}
                        </Link>
                      </TableBodyRowItem1>
                      <TableBodyRowItem2>{product.Quantity}</TableBodyRowItem2>
                      <TableBodyRowItem3>
                        ${product.OrderUnitPrice}
                      </TableBodyRowItem3>
                      <TableBodyRowItem4>
                        ${product.Quantity * Number(product.OrderUnitPrice)}
                      </TableBodyRowItem4>
                      <TableBodyRowItem5>{product.Discount}%</TableBodyRowItem5>
                    </TableBodyRow>
                  ))}
              </TableBody>
            </Table>
          </TableWrapper>
          <Footer>
            <FooterButton onClick={goBack}>Go back</FooterButton>
          </Footer>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading order...</div>
      )}
    </Wrapper>
  );
};

export default Order;

const TableBody = styled.div``;
const TableBodyRow = styled.div`
  border-left: 1px solid rgba(229, 231, 235, 1);
  border-right: 1px solid rgba(229, 231, 235, 1);
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  &:hover {
    background-color: #f3f4f6;
  }
  &:hover:nth-child(even) {
    background-color: #f3f4f6;
  }
  &:nth-child(even) {
    background-color: #fff;
  }
`;
const TableBodyRowItem1 = styled.div`
  padding: 8px 12px;
  width: 46%;
`;
const TableBodyRowItem2 = styled.div`
  padding: 8px 12px;
  width: 14%;
`;
const TableBodyRowItem3 = styled.div`
  padding: 8px 12px;
  width: 19%;
`;
const TableBodyRowItem4 = styled.div`
  padding: 8px 12px;
  width: 18%;
`;
const TableBodyRowItem5 = styled.div`
  padding: 8px 12px;
  width: 15%;
`;

const Table = styled.div`
  color: black;
`;
const TableHeaderRow = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 700;
  align-items: center;
  border-left: 1px solid rgba(229, 231, 235, 1);
  border-right: 1px solid rgba(229, 231, 235, 1);
`;
const TableHeaderRowItem1 = styled.div`
  padding: 8px 12px;
  width: 46%;
`;
const TableHeaderRowItem2 = styled.div`
  padding: 8px 12px;
  width: 14%;
`;
const TableHeaderRowItem3 = styled.div`
  padding: 8px 12px;
  width: 19%;
`;
const TableHeaderRowItem4 = styled.div`
  padding: 8px 12px;
  width: 18%;
`;
const TableHeaderRowItem5 = styled.div`
  padding: 8px 12px;
  width: 15%;
`;

const TableWrapper = styled.div`
  background-color: #fff;
`;

const TableHeader = styled.div`
  color: black;
  font-size: 16px;
  padding: 12px 16px;
  border-left: 1px solid rgba(229, 231, 235, 1);
  border-right: 1px solid rgba(229, 231, 235, 1);
  border-bottom: 1px solid rgba(229, 231, 235, 1);
  font-weight: 700;
`;

const Footer = styled.div`
  padding: 24px;
  background-color: #fff;
  border: 1px solid rgba(229, 231, 235, 1);
  border-top: none;
`;

const FooterButton = styled.div`
  color: white;
  background-color: #ef4444;
  border-radius: 0.25rem;
  width: 63px;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BodyContentLeftItem = styled.div`
  margin-bottom: 15px;
`;
const BodyContentLeftItemTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: black;
  margin-bottom: 10px;
`;
const BodyContentLeftItemValue = styled.div`
  color: black;
`;

const BodyContent = styled.div`
  padding: 24px;
  background-color: #fff;
  display: flex;
`;

const BodyContentLeft = styled.div`
  width: 50%;
`;
const BodyContentRight = styled.div`
  width: 50%;
`;

const Body = styled.div`
  border: 1px solid rgba(229, 231, 235, 1);
`;

const Wrapper = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  color: black;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-left: 8px;
`;
