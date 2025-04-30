import styled from '@emotion/styled';

const StyledInput = styled.input`
  padding: 0.75rem 1.5rem;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  border: 2px solid #e6ccb2;           
  background-color: #fefae0;           
  color: #5c513b;                      
  border-radius: 1rem;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #a89b84;                   
    font-weight: 500;
  }

  &:focus {           
    background-color: #fffdf3;         
  }
`;

export default StyledInput;
