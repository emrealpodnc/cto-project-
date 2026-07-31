import { useParams } from "react-router-dom";
import ProjectDetailCard from "../../components/projects/ProjectDetailCard/ProjectDetailCard";

function ProjectDetail() {
    const { id } = useParams();

    return <ProjectDetailCard projectId={id} />;
}

export default ProjectDetail;