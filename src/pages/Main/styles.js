import styled, { keyframes, css } from "styled-components";

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
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }

  h2 {
    margin-bottom: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 17px;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: solid;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

//criando animação do botao
const animate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background: #0d2636;
  border: 0;
  border-radius: 5px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    scale: 110%;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 20px;
  gap: 10px;
  list-style: none;

  li {
    width: 100%;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #ccc;

    a {
      color: darkgray;
      text-decoration: none;
    }
  }
`;

export const Button = styled.button.attrs({
  type: "button",
})`
  background: transparent;
  color: darkgrey;
  border: 0;
  outline: 0;
  margin-left: 10px;

  :hover {
    scale: 110%;
  }
`;
