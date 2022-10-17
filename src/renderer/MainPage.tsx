import React from 'react';
import styled from 'styled-components';

const MainPage = () => {
  console.log('home');
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Welcome to Northwind Traders</Title>
        <Subtitle>Running on Cloudflare D1</Subtitle>
        <LeftContent>
          <Paragraphs>
            <Paragraph>
              This is a demo of the Northwind dataset, running on{' '}
              <a href="https://workers.cloudflare.com/">Cloudflare's Workers</a>
              , and D1 - Cloudflare's newest SQL database, running on SQLite.
            </Paragraph>
            <Paragraph>
              Read our{' '}
              <a href="https://blog.cloudflare.com/introducing-d1/">
                D1 announcement
              </a>{' '}
              to learn more about D1.
            </Paragraph>
            <Paragraph>
              This dataset was sourced from{' '}
              <a href="https://github.com/jpwhite3/northwind-SQLite3">
                northwind- SQLite3.
              </a>
            </Paragraph>
            <Paragraph>
              You can use the UI to explore Supplies, Orders, Customers,
              Employees and Products, or you can use search if you know what
              you're looking for.
            </Paragraph>
          </Paragraphs>

          <Image
            src="https://imagedelivery.net/4wj01aQOZZ0hemsvbxWAvA/763bcbcd-da6d-46ec-f5e1-70c1c1a33d00/public"
            alt="image"
          />
        </LeftContent>
      </ContentWrapper>
    </Wrapper>
  );
};

export default MainPage;

const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img<{ src: string }>`
  width: 24rem;
`;

const LeftContent = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  color: black;
  padding: 24px;
`;

const ContentWrapper = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Subtitle = styled.div`
  font-size: 18px;
  color: #9ca3af;
  padding-top: 8px;
`;

const Paragraph = styled.div`
  padding-top: 16px;
`;
