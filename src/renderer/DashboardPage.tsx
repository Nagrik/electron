import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectQuery } from '../store/selectors/auth';
import { DashObjType } from '../store/reducers/auth';

const DashboardPage = () => {
  const query = useSelector(selectQuery);
  const [countSelect, setCountSelect] = useState<number>(0);
  const [countSelectWhere, setCountSelectWhere] = useState<number>(0);
  const [countSelectLeft, setCountSelectLeft] = useState<number>(0);
  useEffect(() => {
    if (query) {
      query.map((item: DashObjType) => {
        item.query.map((queryArr: any) => {
          setCountSelect((prev) => prev + queryArr.select);
          setCountSelectWhere((prev) => prev + queryArr.selectWhere);
          setCountSelectLeft((prev) => prev + queryArr.selectJoin);
        });
      });
    }
  }, [query]);

  return (
    <Wrapper>
      <TopContentWrapper>
        <TopContentLeft>
          <Title>Worker</Title>
          <SubTitle>Colo: KBP</SubTitle>
          <SubTitle>Country: UA</SubTitle>
        </TopContentLeft>
        <TopContentRight>
          <Title>SQL Metrics</Title>
          <SubTitle>Query count: {query?.length}</SubTitle>
          <SubTitle>Results count: {query && query.length * 2}</SubTitle>
          <SubTitle># SELECT: {countSelect}</SubTitle>
          <SubTitle># SELECT WHERE: {countSelectWhere}</SubTitle>
          <SubTitle># SELECT LEFT JOIN: {countSelectLeft}</SubTitle>
        </TopContentRight>
      </TopContentWrapper>
      <MainContent>
        <MainContentTitle>Activity log</MainContentTitle>
        <MainContentSubTitle>
          Explore the app and see metrics here
        </MainContentSubTitle>
        <MainContentLogs>
          {query?.map((item: DashObjType) =>
            item.query?.map((itemQuery: any) => {
              console.log(itemQuery);
              return (
                <Log>
                  <div style={{ display: 'flex' }}>
                    <LogsInfo>{item.time}</LogsInfo>
                    <LogsInfo>,&nbsp;SQL&nbsp;,</LogsInfo>
                    <LogsInfo>{itemQuery.executionTime}ms</LogsInfo>
                  </div>
                  <LogString>{itemQuery.query}</LogString>
                </Log>
              );
            })
          )}
        </MainContentLogs>
      </MainContent>
    </Wrapper>
  );
};

export default DashboardPage;

const LogString = styled.div`
  font-size: 14px;
  //line-height: 22px;
  line-height: 1.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
`;

const Log = styled.div`
  padding-top: 8px;
`;

const LogsInfo = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

const MainContentLogs = styled.div``;

const MainContent = styled.div`
  padding-top: 24px;
`;
const MainContentTitle = styled.div`
  font-size: 20px;
  line-height: 30px;
`;

const MainContentSubTitle = styled.div`
  font-size: 12px;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 28px;
`;
const SubTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const Wrapper = styled.div`
  padding: 48px;
`;
const TopContentWrapper = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: space-between;
`;
const TopContentLeft = styled.div`
  width: 49%;
`;
const TopContentRight = styled.div`
  width: 49%;
`;
