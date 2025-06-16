import React from "react";
import { useState, useEffect } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton, Card } from "./styles";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);

  useEffect(() => {
    console.log("Repos atualizados:", repositorios);
  }, [repositorios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newRepo.trim) {
      try {
        const response = await api.get(`repos/${newRepo}`);
        //console.log(response.data);
        const data = {
          name: response.data.full_name,
        };
        setRepositorios([...repositorios, data]);
        setNewRepo("");
      } catch (error) {
        console.error(`Erro na requisição ${error}`);
      }
    }
  };

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
  };

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>

      <div>
        {repositorios.map((repo) => (
          <Card key={repo.name}>
            <header>{repo.name}</header>
          </Card>
        ))}
      </div>
    </Container>
  );
}
