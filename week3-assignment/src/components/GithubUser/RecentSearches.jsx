import styled from '@emotion/styled';

function RecentSearches({ items, onClickKeyword, onDeleteKeyword }) {
    return (
      <Wrapper>
        {items.length > 0 && (
          <>
            <Title>최근 검색어</Title>
            <KeywordList>
              {items.map((item) => (
                <Keyword key={item} onClick={() => onClickKeyword(item)}>
                  {item}
                  <DeleteBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteKeyword(item);
                    }}
                  >
                    ×
                  </DeleteBtn>
                </Keyword>
              ))}
            </KeywordList>
          </>
        )}
      </Wrapper>
    );
  }  

export default RecentSearches;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Title = styled.h1`
  color: #5c513b;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const KeywordList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Keyword = styled.div`
  background-color: #EED3D9;
  border: 1px solid #e6ccb2;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DeleteBtn = styled.span`
  margin-left: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #a3b18a;
`;