import { useParams } from "react-router-dom";

import { Container } from "./styles";

export default function Repositorio() {
  const { repositorio } = useParams();

  return (
    <>
      <Container> {`Repositório: ${repositorio}`} </Container>
    </>
  );
}
