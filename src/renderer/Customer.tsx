import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Ballot from './icons/Ballot';

type CustomerType = {
  Address: string;
  City: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Country: string;
  CustomerID: string;
  Fax: string;
  Phone: string;
  PostalCode: string;
  Region: string;
};

const Customer = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const goBack = () => {
    navigation('/customers');
  };

  const [customerData, setCustomerData] = useState<CustomerType | null>(null);
  useEffect(() => {
    axios
      .get(`https://therealyo-northwind.herokuapp.com/customer?id=${id}`)
      .then((res: any) => {
        setCustomerData(res.data.data);
      });
  }, []);
  return (
    <Wrapper>
      {customerData ? (
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
                    Company Name
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.CompanyName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Contact Name
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.ContactName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Contact Title
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.ContactTitle}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Address</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.Address}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>City</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.City}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentLeft>
              <BodyContentRight>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Region</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.Region}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Postal Code
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.PostalCode}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Country</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.Country}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Phone</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {customerData?.Phone}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentRight>
            </BodyContent>
          </Body>
          <Footer>
            <FooterButton onClick={goBack}>Go back</FooterButton>
          </Footer>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading customer...</div>
      )}
    </Wrapper>
  );
};

export default Customer;

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
