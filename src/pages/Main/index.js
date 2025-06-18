import React from "react";
//import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        if (newRepo.trim) {
          try {
            const response = await api.get(`repos/${newRepo}`);
            const data = {
              name: response.data.full_name,
              id: response.data.id,
            };
            setRepositorios([...repositorios, data]);
            setNewRepo("");
            console.log(response.data);
          } catch (error) {
            console.error(`Erro na requisição: ${error}`);
          } finally {
            setLoading(false);
          }
        }
      }
      submit();
    },
    [newRepo, repositorios]
  );

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
  };

  const onDeleteItem = (id) => {
    const newRepositories = repositorios.filter((repo) => repo.id !== id);
    setRepositorios(newRepositories);
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
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        <h2>Lista de Repositórios</h2>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>{repo.name}</span>
            <div>
              <FaBars size={14} color="#000" />
              <DeleteButton onClick={() => onDeleteItem(repo.id)}>
                <FaTrash size={14} color="#000" />
              </DeleteButton>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
}
