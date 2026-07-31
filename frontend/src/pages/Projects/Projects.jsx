import "./Projects.css";
import { useState } from "react";

import Layout from "../../components/Layout/Layout";
import ProjectToolbar from "../../components/projects/ProjectToolbar/ProjectToolbar";
import ProjectTable from "../../components/projects/ProjectTable/ProjectTable";

function Projects() {

  const [durumFiltresi, setDurumFiltresi] = useState("");
  const [aramaMetni, setAramaMetni] = useState("");
  return (
    <Layout>

     <ProjectToolbar
    durumFiltresi={durumFiltresi}
    setDurumFiltresi={setDurumFiltresi}
    aramaMetni={aramaMetni}
    setAramaMetni={setAramaMetni}
/>

   <ProjectTable
    durumFiltresi={durumFiltresi}
    aramaMetni={aramaMetni}
/>

    </Layout>
  );
}

export default Projects;