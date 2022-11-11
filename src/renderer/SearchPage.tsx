import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from './icons/SearchIcon';
import useOnClickOutside from './hooks/useOnClickOutside';

type SearchResponseProducts = {
  queries: [
    {
      query: string;
      metrics: {
        select: number;
        selectWhere: number;
        selectJoin: number;
        executionTime: number;
      };
    }
  ];
  data: [
    {
      ProductID: number;
      ProductName: string;
      SupplierID: number;
      CategoryID: number;
      QuantityPerUnit: string;
      UnitPrice: string;
      UnitsInStock: number;
      UnitsOnOrder: number;
      ReorderLevel: number;
      Discontinued: number;
    }
  ];
};

type SearchResponseCustomer = {
  queries: [
    {
      query: string;
      metrics: {
        select: number;
        selectWhere: number;
        selectJoin: number;
        executionTime: number;
      };
    }
  ];
  data: [
    {
      CustomerID: string;
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
    }
  ];
};

const SearchPage = () => {
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResponseProducts, setSearchResponseProducts] =
    useState<SearchResponseProducts | null>(null);
  const [searchResponseCustomer, setSearchResponseCustomer] =
    useState<SearchResponseCustomer | null>(null);
  const [isProductsActive, setIsProductsActive] = useState<boolean>(false);
  const inputRef = useOnClickOutside(() => {
    setInputActive(false);
  });

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
    if (e.key === 'Enter') {
      axios
        .get(
          `https://therealyo-northwind.herokuapp.com/searchProduct?search=${inputValue}`
        )
        .then((res) => {
          setSearchResponseProducts(res.data);
        });

      window.api.products.searchProduct(inputValue).then((data) => {
        console.log('SEARCH PRODUCT:', data);
      });

      axios
        .get(
          `https://therealyo-northwind.herokuapp.com/searchCustomer?search=${inputValue}`
        )
        .then((res) => {
          setSearchResponseCustomer(res.data);
        });

      window.api.customers.searchCustomer(inputValue).then((data) => {
        console.log('SEARCH CUSTOMER:', data);
      });
    }
  };
  return (
    <Wrapper>
      <Content>
        <ContentTitle>Search Database</ContentTitle>
        <InputWrapper
          ref={inputRef}
          active={inputActive}
          onClick={() => setInputActive(true)}
        >
          <Icon>
            <SearchIcon />
          </Icon>
          <Input
            placeholder="Enter keyword..."
            onChange={(e) => handleInput(e)}
            onKeyPress={(e) => handleInput(e)}
          />
        </InputWrapper>
        <ContentTitle>Tables</ContentTitle>
        <TableWrapper>
          <Choice onClick={() => setIsProductsActive(true)}>
            {!isProductsActive ? (
              <Circle />
            ) : (
              <CircleActive>
                <CircleActiveIcon />
              </CircleActive>
            )}

            <TableTitle>Products</TableTitle>
          </Choice>
          <Choice onClick={() => setIsProductsActive(false)}>
            {isProductsActive ? (
              <Circle />
            ) : (
              <CircleActive>
                <CircleActiveIcon />
              </CircleActive>
            )}
            <TableTitle>Customers</TableTitle>
          </Choice>
        </TableWrapper>
        <SearchResultTitle style={{ fontSize: '18px' }}>
          Search results
        </SearchResultTitle>
        {!isProductsActive &&
        searchResponseCustomer &&
        searchResponseCustomer.data.length > 1
          ? searchResponseCustomer.data.map((product) => (
              <SearchResult>
                <SearchResultMainTitle>
                  <Link to={`/customer/${product.CustomerID}`}>
                    {product.ContactName}
                  </Link>
                </SearchResultMainTitle>
                <SearchResultMainSubtitle>
                  #${product.CustomerID}, Contact:
                  {product.ContactName}, Title: ${product.ContactTitle}, Phone:
                  ${product.Phone}
                </SearchResultMainSubtitle>
              </SearchResult>
            ))
          : !isProductsActive && (
              <SearchResult>
                <SearchResultMainTitle>
                  <SearchResultMainSubtitle>
                    No results
                  </SearchResultMainSubtitle>
                </SearchResultMainTitle>
              </SearchResult>
            )}
        {isProductsActive &&
        searchResponseProducts &&
        searchResponseProducts.data.length > 1
          ? searchResponseProducts.data.map((product) => (
              <SearchResult>
                <SearchResultMainTitle>
                  <Link to={`/product/${product.ProductID}`}>
                    {product.ProductName}
                  </Link>
                </SearchResultMainTitle>
                <SearchResultMainSubtitle>
                  #${product.ProductID}, Quantity Per Unit: $
                  {product.QuantityPerUnit}, Price: ${product.UnitPrice}, Stock:
                  ${product.UnitsInStock}
                </SearchResultMainSubtitle>
              </SearchResult>
            ))
          : isProductsActive && (
              <SearchResult>
                <SearchResultMainTitle>
                  <SearchResultMainSubtitle>
                    No results
                  </SearchResultMainSubtitle>
                </SearchResultMainTitle>
              </SearchResult>
            )}
      </Content>
    </Wrapper>
  );
};

export default SearchPage;

const SearchResultMainSubtitle = styled.div`
  color: #9ca3af;
  font-size: 14px;
`;
const SearchResultMainTitle = styled.div`
  font-size: 16px;
  color: #2563eb;
  padding-bottom: 5px;
`;

const SearchResult = styled.div`
  padding-bottom: 8px;
`;

const SearchResultTitle = styled.div`
  margin-top: 24px;
  color: black;
  margin-bottom: 12px;
  font-weight: 700;
`;

const CircleActiveIcon = styled.div`
  width: 9px;
  height: 9px;
  border: 1px solid rgba(209, 213, 219, 1);
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CircleActive = styled.div`
  width: 20px;
  height: 20px;
  background-color: #3b82f6;
  border: 1px solid rgba(209, 213, 219, 1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Choice = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  cursor: pointer;
`;

const TableTitle = styled.div`
  color: black;
  font-size: 16px;
  padding-left: 8px;
`;
const Circle = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(209, 213, 219, 1);
  border-radius: 50%;
  cursor: pointer;
`;
const TableWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div<{ active: boolean }>`
  display: flex;
  color: black;
  border: ${({ active }) =>
    active ? '2px solid cadetblue' : '2px solid rgba(156, 163, 175, 1)'};
  width: 400px;
  padding: 5px 0;
  border-radius: 0.25rem;
  margin-bottom: 12px;
`;

const Input = styled.input`
  border: none;
  padding: 5px 5px;
  font-size: 16px;
  width: 400px;
  &::placeholder {
    color: rgba(156, 163, 175, 1);
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;

const ContentTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: black;
  margin-bottom: 12px;
`;

const Wrapper = styled.div`
  padding: 24px;
`;

const Content = styled.div`
  padding: 24px;
  background-color: #fff;
`;
