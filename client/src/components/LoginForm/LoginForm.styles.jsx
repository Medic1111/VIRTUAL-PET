import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.2s;
  input {
    width: 27.5rem;
    height: 4.4rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding-left: 1.2rem;
    font-size: 2rem;
    font-family: "Indie Flower", cursive, sans-serif;
    background-color: white;
    &:focus {
      outline: none !important;
      border: 1px solid #604423c7;
    }
  }
`;
