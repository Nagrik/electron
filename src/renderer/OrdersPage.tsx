import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import HeaderArrowIcon from './icons/HeaderArrowIcon';

type Order = {
  CustomerID: string;
  Freight: string;
  OrderDate: string;
  OrderID: number;
  RequiredDate: string;
  ShipAddress: string;
  ShipCity: string;
  ShipName: string;
  ShipVia: number;
  ShippedDate: string;
  totalprice: number;
  totalproducts: string;
  totalquantity: string;
  ShipCountry: string;
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    axios
      .get(
        `https://therealyo-northwind.herokuapp.com/orders?page=${currentPage}`
      )
      .then((res) => {
        // console.log(res);
        setOrders(res.data);
        return res.data;
      });
  }, [currentPage]);
  return (
    <Wrapper>
      {orders ? (
        <>
          <Header>
            <HeaderTitle>Orders</HeaderTitle>
            <HeaderArrowIcon />
          </Header>
          <Table>
            <TableHeader>
              <Company> Id</Company>
              <Contact>Total Price</Contact>
              <Title>Products</Title>
              <City>Quantity</City>
              <Country>Shipped</Country>
              <Country>Ship Name</Country>
              <Country>City</Country>
              <Country>Country</Country>
            </TableHeader>
            <TableBody>
              {orders?.page.map((order: Order) => (
                <TableRow>
                  <BodyCompany>
                    <Link to={`/order/${order.OrderID}`}>{order.OrderID}</Link>
                  </BodyCompany>
                  <BodyContact>{order.totalprice}</BodyContact>
                  <BodyTitle>{order.totalproducts}</BodyTitle>
                  <BodyCity>{order.totalquantity}</BodyCity>
                  <BodyCountry>
                    {format(new Date(order.ShippedDate), 'yyyy-LL-dd')}
                  </BodyCountry>
                  <BodyCountry>{order.ShipName}</BodyCountry>
                  <BodyCountry>{order.ShipCity}</BodyCountry>
                  <BodyCountry1>{order.ShipCountry}</BodyCountry1>
                </TableRow>
              ))}
              <PaginationWrapper>
                <PaginationNumberWrapper>
                  {Array.from(
                    { length: Math.ceil(orders?.count / 20) },
                    (_, i) => i + 1
                  ).map((number) => {
                    return (
                      <PaginationNumber
                        active={number === currentPage}
                        onClick={() => {
                          setCurrentPage(number);
                        }}
                      >
                        {number}
                      </PaginationNumber>
                    );
                  })}
                </PaginationNumberWrapper>
                <PageCount>
                  Page: {currentPage} of {Math.ceil(orders?.count / 20)}
                </PageCount>
              </PaginationWrapper>
            </TableBody>
          </Table>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading orders...</div>
      )}
    </Wrapper>
  );
};

export default OrdersPage;

const PageCount = styled.div`
  font-size: 12.8px;
`;

const PaginationNumberWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid rgba(243, 244, 246, 1);
`;

const PaginationNumber = styled.div<{ active: boolean }>`
  width: 7px;
  padding: 10px 16px;
  border: ${({ active }) =>
    active ? '1px solid rgba(209, 213, 219, 1)' : 'none'};
  margin-right: 8px;
`;

const PaginationWrapper = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BodyCountry1 = styled.div`
  width: 12.25%;
  padding: 9px 12px;
`;

const BodyCompany = styled.div`
  width: 5.5%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyContact = styled.div`
  width: 9%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyTitle = styled.div`
  width: 9%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCity = styled.div`
  width: 8%;

  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCountry = styled.div`
  width: 12.25%;

  padding: 9px 12px;
  //border: 1px solid #000;
`;

const TableBody = styled.div`
  background-color: #fff;
`;

const TableRow = styled.div`
  width: 98%;
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

const Icon = styled.div`
  width: 5%;
  padding: 9px 12px;
`;

const Company = styled.div`
  width: 5.5%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Contact = styled.div`
  width: 9%;
  font-size: 16px;
  padding: 9px 12px;
  font-weight: 700;
`;
const Title = styled.div`
  width: 8%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const City = styled.div`
  width: 7.5%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Country = styled.div`
  width: 12.5%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;

const Table = styled.div``;

const TableHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const Wrapper = styled.div`
  color: black;
  padding: 24px;
  border: 1px solid rgba(243, 244, 246, 1); ;
`;

const Header = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(243, 244, 246, 1); ;
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;