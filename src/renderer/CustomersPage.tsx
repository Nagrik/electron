import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Svg from 'react-inlinesvg';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';
import { useDispatch } from 'react-redux';
import HeaderArrowIcon from './icons/HeaderArrowIcon';
import { PaginationRow } from './OrdersPage';
import Pagination from './Pagination';
import { setQuery } from '../store/actions/login';
import { Customer, CustomerPageQuery } from '../types/customer';

const CustomersPage = () => {
  const [customers, setCustomers] = useState<CustomerPageQuery | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const domain = window.localStorage.getItem('domain');
    if (window.localStorage.getItem('domain')) {
      axios.get(`${domain}/customers?page=${currentPage}`).then((res) => {
        // console.log(res);
        setCustomers(res.data);
        return res.data;
      });
    } else {
      window.api.customers.getCustomerPage(currentPage).then((data) => {
        console.log('pageData: ', data);
        setCustomers(data);
      });
      return () => {
        window.api.removeAllListeners('getCustomerPage');
      };
    }
  }, [currentPage]);

  useEffect(() => {
    if (customers && customers.queries.length > 0) {
      const obj = {
        query: customers?.queries,
        time: new Date().toISOString(),
      };
      dispatch(setQuery(obj));
    }
  }, [customers, dispatch]);
  return (
    <Wrapper>
      {customers ? (
        <>
          <Header>
            <HeaderTitle>Customers</HeaderTitle>
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
              {customers.data.map((customer: Customer, i) => {
                const svg = createAvatar(style, {
                  seed: customer.ContactName,
                  // ... and other options
                });
                if (i < 1) return;
                return (
                  <TableRow>
                    <BodyIcon>
                      <Circle>
                        <Svg src={svg} />
                      </Circle>
                    </BodyIcon>
                    <BodyCompany>
                      <Link to={`/customer/${customer.CustomerID}`}>
                        {customer.CompanyName}
                      </Link>
                    </BodyCompany>

                    <BodyContact>{customer.ContactName}</BodyContact>
                    <BodyTitle>{customer.ContactTitle}</BodyTitle>
                    <BodyCity>{customer.City}</BodyCity>
                    <BodyCountry>{customer.Country}</BodyCountry>
                  </TableRow>
                );
              })}
              <PaginationWrapper>
                <PaginationRow>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={customers.data[0].count}
                    pageSize={20}
                    onPageChange={(page: any) => setCurrentPage(page)}
                  />
                </PaginationRow>
                <PageCount>
                  Page: {currentPage} of{' '}
                  {Math.ceil(customers.data[0].count! / 20)}
                </PageCount>
              </PaginationWrapper>
            </TableBody>
          </Table>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading Customers...</div>
      )}
    </Wrapper>
  );
};

export default CustomersPage;

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
  overflow: hidden;
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
