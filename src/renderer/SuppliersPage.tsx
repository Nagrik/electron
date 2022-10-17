import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderArrowIcon from './icons/HeaderArrowIcon';

type Supplier = {
  Address: string;
  City: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Country: string;
  Fax: string;
  HomePage: string;
  Phone: string;
  PostalCode: string;
  Region: string;
  SupplierID: null;
};

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get(
        `https://therealyo-northwind.herokuapp.com/suppliers?page=${currentPage}`
      )
      .then((res) => {
        // console.log(res);
        setSuppliers(res.data);
        return res.data;
      });
  }, [currentPage]);
  const getInitials = function (string: string) {
    const names = string.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };
  return (
    <Wrapper>
      {suppliers ? (
        <>
          <Header>
            <HeaderTitle>Suppliers</HeaderTitle>
            <HeaderArrowIcon />
          </Header>
          <Table>
            <TableHeader>
              <Icon />
              <Company>Company</Company>
              <Contact>Contact</Contact>
              <Title>Title</Title>
              <City>City</City>
              <Country>Country</Country>
            </TableHeader>
            <TableBody>
              {suppliers?.page.map((supplier: Supplier) => {
                return (
                  <TableRow>
                    <BodyIcon>
                      <Circle>{getInitials(supplier.ContactName)}</Circle>
                    </BodyIcon>
                    <BodyCompany>
                      <Link to={`/supplier/${supplier.SupplierID}`}>
                        {supplier.CompanyName}
                      </Link>
                    </BodyCompany>

                    <BodyContact>{supplier.ContactName}</BodyContact>
                    <BodyTitle>{supplier.ContactTitle}</BodyTitle>
                    <BodyCity>{supplier.City}</BodyCity>
                    <BodyCountry>{supplier.Country}</BodyCountry>
                  </TableRow>
                );
              })}
              <PaginationWrapper>
                <PaginationNumberWrapper>
                  {Array.from(
                    { length: Math.ceil(suppliers?.count / 20) },
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
                  Page: {currentPage} of {Math.ceil(suppliers?.count / 20)}
                </PageCount>
              </PaginationWrapper>
            </TableBody>
          </Table>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading suppliers...</div>
      )}
    </Wrapper>
  );
};

export default SuppliersPage;

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

const Circle = styled.div`
  width: 24px;
  height: 24px;
  background-color: cadetblue;
  border-radius: 50%;
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BodyIcon = styled.div`
  width: 5%;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 1px solid #000;
`;
const BodyCompany = styled.div`
  width: 30%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyContact = styled.div`
  width: 15%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyTitle = styled.div`
  width: 20%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCity = styled.div`
  width: 15%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCountry = styled.div`
  width: 13%;
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
  width: 30%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Contact = styled.div`
  width: 15%;
  font-size: 16px;
  padding: 9px 12px;
  font-weight: 700;
`;
const Title = styled.div`
  width: 20%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const City = styled.div`
  width: 15%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Country = styled.div`
  width: 15%;
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