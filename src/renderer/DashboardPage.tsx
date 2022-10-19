import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectQuery } from '../store/selectors/auth';
import { DashObjType } from '../store/reducers/auth';

const DashboardPage = () => {
  const query = useSelector(selectQuery);
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
          <SubTitle>Results count: 42</SubTitle>
          <SubTitle># SELECT: 4</SubTitle>
          <SubTitle># SELECT WHERE: 0</SubTitle>
          <SubTitle># SELECT LEFT JOIN: 0</SubTitle>
        </TopContentRight>
      </TopContentWrapper>
      <MainContent>
        <MainContentTitle>Activity log</MainContentTitle>
        <MainContentSubTitle>
          Explore the app and see metrics here
        </MainContentSubTitle>
        <MainContentLogs>
          {query?.map((item: DashObjType) =>
            item.query?.map((itemQuery: string) => {
              return (
                <Log>
                  <LogsInfo>{item.time}</LogsInfo>
                  <LogString>{itemQuery}</LogString>
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
