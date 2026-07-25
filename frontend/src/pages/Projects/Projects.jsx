import "./Projects.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import ProjectToolbar from "../../components/projects/ProjectToolbar/ProjectToolbar";
import ProjectTable from "../../components/projects/ProjectTable/ProjectTable";

function Projects() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Header />

        <ProjectToolbar />

        <ProjectTable />

      </div>

    </div>
  );
}

export default Projects;