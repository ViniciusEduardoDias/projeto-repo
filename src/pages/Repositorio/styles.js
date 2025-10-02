import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background-color: white;
  max-width: 900px;
  border-radius: 20px;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px auto;

  h1 {
    font-size: 24px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.5);
  padding: 40px;

  img {
    border-radius: 50%;
  }
`;

export const Loading = styled.div`
  color: white;
  font-size: 30px;
  font-weight: bold;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Issues = styled.ul`
  list-style: none;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  border-radius: 5px;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    margin-bottom: 10px;
    align-items: center;
    gap: 10px;

    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      span {
        font-weight: bold;
        padding: 5px;
        background: #eee;
        border-radius: 5px;
        font-size: 12px;
      }
    }

    a {
      text-decoration: none;
    }
  }
`;

export const BackButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  border: none;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;

  :hover {
    background-color: darkred;
    transition: background-color 0.3s;
  }
`;

export const Pageactions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  button {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: darkred;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: grey;
    }
  }
`;

export const FilterList = styled.div`
  margin-top: 20px;

  button {
    margin-right: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    background-color: #fff;
    color: gray;
    cursor: pointer;
    &:hover {
      background-color: darkblue;
      color: white;
    }
    &:nth-child(${(props) => props.active + 1}) {
      background-color: blue;
      color: white;
    }
  }
`;
