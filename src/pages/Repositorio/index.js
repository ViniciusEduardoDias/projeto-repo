import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

import { Container, Loading, Owner, Issues } from "./styles";

export default function Repositorio({ match }) {
  const { repositorio } = useParams();
  const [repositorioDatas, setRepositorioDatas] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepositorioDatas(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [repositorio]);

  if (loading) {
    return (
      <Loading>
        <h1 style={{ color: "white" }}>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <Owner>
        <h1>{repositorioDatas.name}</h1>
        <img
          src={repositorioDatas.owner.avatar_url}
          alt={repositorioDatas.owner.login}
          width={120}
        />
      </Owner>

      {issues.length > 0 && (
        <>
          <h2 style={{ color: "white", marginTop: 20 }}>Issues abertas</h2>
          <Issues>
            {issues.map((issue) => (
              <li key={issue.id}>
                <div>
                  <span>Título</span>
                  <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.title}
                  </a>
                </div>
                <div>
                  <span>Autor</span> <p>Autor: {issue.user.login}</p>
                </div>
              </li>
            ))}
          </Issues>
        </>
      )}
      {issues && (
        <h1 style={{ color: "white", marginTop: 20 }}>
          Nenhuma issue aberta neste repositório
        </h1>
      )}
    </Container>
  );
}
