import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function getRepos() {
    const { data } = await api.get("repositories");
    setRepositories(data);
  }

  async function addRepository() {
    try {
      const { data } = await api.post(`repositories`, {});
      return setRepositories(repos => [...repos, data]);
    } catch (error) {
      alert("Something went wrong");
    }
  }

  async function removeRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      return setRepositories(repos => repos.filter(repo => repo.id !== id));
    } catch (error) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
          repo =>
            repo && (
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => removeRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
        )}
      </ul>

      <button onClick={addRepository}>Adicionar</button>
    </div>
  );
}

export default App;
