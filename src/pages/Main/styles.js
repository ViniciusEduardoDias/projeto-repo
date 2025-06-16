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

  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: solid;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const SubmitButton = styled.button.attrs({
  type: "submit",
})`
  background: #0d2636;
  border: 0;
  border-radius: 5px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  padding: 10px;
  margin: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
