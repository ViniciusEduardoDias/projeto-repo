import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { IoIosArrowBack } from "react-icons/io";
import {
  Container,
  Loading,
  Owner,
  Issues,
  BackButton,
  Pageactions,
} from "./styles";

export default function Repositorio() {
  const { repositorio } = useParams();
  const [repositorioDatas, setRepositorioDatas] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: "open",
            per_page: 5,
            page,
          },
        }),
      ]);

      setRepositorioDatas(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [repositorio, page]); // importante incluir page aqui

  if (loading) {
    return (
      <Loading>
        <h1 style={{ color: "white" }}>Carregando...</h1>
      </Loading>
    );
  }

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
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
        <a href={repositorioDatas.html_url} target="_blank" rel="noreferrer">
          Visite o repositório
        </a>
      </Owner>

      {issues.length > 0 ? (
        <>
          <h2 style={{ marginTop: 20 }}>ISSUES ABERTAS</h2>
          <Issues>
            {issues.map((issue) => (
              <li key={issue.id}>
                <img
                  src={issue.user.avatar_url}
                  style={{ borderRadius: "50%", width: 50 }}
                  alt={issue.user.login}
                />
                <div>
                  <p>{issue.user.login}</p>
                  <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.title}
                  </a>
                </div>
              </li>
            ))}
          </Issues>
        </>
      ) : (
        <h1 style={{ color: "white", marginTop: 20 }}>
          Nenhuma issue aberta neste repositório
        </h1>
      )}

      <Pageactions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage("back")}
        >
          Back
        </button>
        <button type="button" onClick={() => handlePage("next")}>
          Next
        </button>
      </Pageactions>
    </Container>
  );
}
