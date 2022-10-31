import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Ballot from './icons/Ballot';

type Supplier = {
  queries: string[];
  data: {
    Address: string;
    BirthDate: string;
    City: string;
    Country: string;
    EmployeeID: number;
    Extension: number;
    FirstName: string;
    HireDate: string;
    HomePhone: string;
    LastName: string;
    Notes: string;
    PostalCode: string;
    Region: string;
    ReportsTo: string;
    Title: string;
    TitleOfCourtesy: string;
    ReportsToFullName: string;
  };
};

const Employees = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const goBack = () => {
    navigation('/employees');
  };
  const [productData, setProductData] = useState<Supplier | null>(null);
  useEffect(() => {
    axios
      .get(`https://therealyo-northwind.herokuapp.com/employee?id=${id}`)
      .then((res: any) => {
        setProductData(res.data);
      });
  }, [id]);
  console.log(productData);
  return (
    <Wrapper>
      {productData ? (
        <>
          <Body>
            <Header>
              <Ballot />
              <HeaderTitle>Product information</HeaderTitle>
            </Header>
            <BodyContent>
              <BodyContentLeft>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Name</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.FirstName} {productData?.data.LastName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Title</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.Title}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Title Of Courtesy
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.TitleOfCourtesy}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Birth Date
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.BirthDate}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Hire Date</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.HireDate}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Address</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.Address}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>City</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.City}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentLeft>
              <BodyContentRight>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Postal Code
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.PostalCode}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Country</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.Country}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Home Phone
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.HomePhone}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Extension</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.Extension}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Notes</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.Notes}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Reports To
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    <Link to={`/employee/${productData.data.ReportsTo}`}>
                      {productData?.data.ReportsToFullName}
                    </Link>
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
        <div style={{ color: '#000' }}>Loading product...</div>
      )}
    </Wrapper>
  );
};

export default Employees;

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
