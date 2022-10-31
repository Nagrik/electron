import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Ballot from './icons/Ballot';

type SupplierType = {
  queries: string[];
  data: {
    SupplierID: number;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Address: string;
    City: string;
    Region: string;
    PostalCode: string;
    Country: string;
    Phone: string;
    Fax: string;
    HomePage: string;
  };
};

const Supplier = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const goBack = () => {
    navigation('/suppliers');
  };
  const [supplierData, setSupplierData] = useState<SupplierType | null>(null);
  useEffect(() => {
    axios
      .get(`https://therealyo-northwind.herokuapp.com/supplier?id=${id}`)
      .then((res: any) => {
        setSupplierData(res.data);
      });
  }, []);
  return (
    <Wrapper>
      {supplierData ? (
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
                    {supplierData.data.CompanyName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Contact Name
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.ContactName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Contact Title
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.ContactTitle}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Address</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.Address}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>City</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.City}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentLeft>
              <BodyContentRight>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Region</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.Region}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Postal Code
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.PostalCode}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Country</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.Country}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Phone</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {supplierData.data.Phone}
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
        <div style={{ color: '#000' }}>Loading supplier...</div>
      )}
    </Wrapper>
  );
};

export default Supplier;

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
