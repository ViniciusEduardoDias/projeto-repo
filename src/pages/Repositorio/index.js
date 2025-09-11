import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { IoIosArrowBack } from "react-icons/io";

import { Container, Loading, Owner, Issues, BackButton } from "./styles";
import { LuRadius } from "react-icons/lu";

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
      <BackButton>
        <Link to="/">
          <IoIosArrowBack size={20} color="white" />
        </Link>
      </BackButton>
      <Owner>
        <h1>{repositorioDatas.name}</h1>
        <img
          src={repositorioDatas.owner.avatar_url}
          alt={repositorioDatas.owner.login}
          width={120}
        />
        <Link to={issues.html_url}>Visite o repositório</Link>
      </Owner>

      {issues.length > 0 && (
        <>
          <h2 style={{ marginTop: 20 }}>ISSUES ABERTAS</h2>
          <Issues>
            {issues.map((issue) => (
              <li key={issue.id}>
                <div>
                  <span>Título</span>
                  <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.title}
                  </a>
                </div>
                <div style={{ textAlign: "center", width: "30%" }}>
                  <div>
                    <span>Autor</span>{" "}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <img
                      src={issue.user.avatar_url}
                      style={{ borderRadius: "50%", width: 40 }}
                      alt={issue.user.login}
                    />
                    <p>{issue.user.login}</p>
                  </div>
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
