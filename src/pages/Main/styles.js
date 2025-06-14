import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;

  gap: 5px;

  button {
    padding: 10px;
    border-radius: 4px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const SubmitButton = styled.button``;
