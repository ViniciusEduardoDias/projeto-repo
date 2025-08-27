import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

import { Container } from "./styles";

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
        api.get(`/repos/${repositorio}/issues`),
        {
          params: {
            state: "open",
            per_page: 5,
          },
        },
      ]);
      setRepositorioDatas(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
  }, [repositorio]);

  return (
    <Container>
      <h1 style={{ color: "white" }}>{repositorio}</h1>
    </Container>
  );
}
