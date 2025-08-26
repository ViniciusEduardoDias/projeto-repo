import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, Button } from "./styles";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const repoStorage = localStorage.getItem("repos");
    console.log("Repos salvo no localStorage:", repoStorage);
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!newRepo.trim()) {
        alert("Digite o nome de um repositório!");
        return;
      }

      const hasRepo = repositorios.find((repo) => repo.name === newRepo);
      if (hasRepo) {
        alert("Repositório duplicado!");
        setNewRepo("");
        return;
      }

      async function submit() {
        setLoading(true);
        try {
          const response = await api.get(`repos/${newRepo}`);
          if (!response.data.id) {
            alert("Repositório inválido!");
            return;
          }
          const data = {
            name: response.data.full_name,
            id: response.data.id,
          };
          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert("Repositório inválido!");
          } else {
            console.error("Erro inesperado:", error);
          }
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [newRepo, repositorios]
  );

  const handleInputChange = (e) => setNewRepo(e.target.value);
  const onDeleteItem = (id) =>
    setRepositorios(repositorios.filter((repo) => repo.id !== id));

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
          <li key={repo.id}>
            <span>{repo.name}</span>
            <div>
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                <Button>
                  <FaBars size={14} color="#000" />
                </Button>
              </Link>
              <Button onClick={() => onDeleteItem(repo.id)}>
                <FaTrash size={14} color="#000" />
              </Button>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
}
