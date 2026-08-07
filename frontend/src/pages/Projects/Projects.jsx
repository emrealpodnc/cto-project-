import "./Projects.css";
import { useState } from "react";

import Layout from "../../components/Layout/Layout";
import ProjectToolbar from "../../components/projects/ProjectToolbar/ProjectToolbar";
import ProjectTable from "../../components/projects/ProjectTable/ProjectTable";

function Projects() {

  const [durumFiltresi, setDurumFiltresi] = useState("");
  const [aramaMetni, setAramaMetni] = useState("");
  const [oncelikFiltresi, setOncelikFiltresi] = useState("");
const [yoneticiFiltresi, setYoneticiFiltresi] = useState("");
  return (
    <Layout>

  <ProjectToolbar
    durumFiltresi={durumFiltresi}
    setDurumFiltresi={setDurumFiltresi}

    oncelikFiltresi={oncelikFiltresi}
    setOncelikFiltresi={setOncelikFiltresi}

    yoneticiFiltresi={yoneticiFiltresi}
    setYoneticiFiltresi={setYoneticiFiltresi}

    aramaMetni={aramaMetni}
    setAramaMetni={setAramaMetni}
/>

  <ProjectTable
    durumFiltresi={durumFiltresi}
    oncelikFiltresi={oncelikFiltresi}
    yoneticiFiltresi={yoneticiFiltresi}
    aramaMetni={aramaMetni}
/>
    </Layout>
  );
}

export default Projects;