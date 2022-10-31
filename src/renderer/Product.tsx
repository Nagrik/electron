import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Ballot from './icons/Ballot';

type Supplier = {
  queries: string[];
  data: {
    CategoryID: number;
    Discontinued: number;
    ProductID: number;
    ProductName: string;
    QuantityPerUnit: string;
    ReorderLevel: number;
    Supplier: string;
    SupplierID: number;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: number;
  };
};

const Product = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const goBack = () => {
    navigation('/products');
  };
  const [productData, setProductData] = useState<Supplier | null>(null);
  useEffect(() => {
    axios
      .get(`https://therealyo-northwind.herokuapp.com/product?id=${id}`)
      .then((res: any) => {
        setProductData(res.data);
      });
  }, []);
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
                  <BodyContentLeftItemTitle>
                    Product Name
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.ProductName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Supplier</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.Supplier}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Quantity Per Unit
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.QuantityPerUnit}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Unit Price
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.UnitPrice}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentLeft>
              <BodyContentRight>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Units In Stock
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.UnitsInStock}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Units In Order
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.UnitsOnOrder}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Reorder Level
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.ReorderLevel}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Discontinued
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {productData?.data.Discontinued}
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

export default Product;

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
