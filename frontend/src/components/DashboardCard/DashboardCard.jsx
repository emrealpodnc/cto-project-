import "./DashboardCard.css";
import {
MdFolder,
MdPlayCircle,
MdSchedule,
MdPauseCircle,
MdWarning,
MdCheckCircle,
MdDescription,
MdFlag
} from "react-icons/md";

function DashboardCard({ title, value, color }) {

    let icon;
let iconColor;

switch (title) {

    case "Toplam Proje":
        icon = <MdFolder />;
        iconColor = "#2563EB";
        break;

    case "Devam Eden":
        icon = <MdPlayCircle />;
        iconColor = "#F97316";
        break;

    case "Planlanan":
        icon = <MdSchedule />;
        iconColor = "#6B7280";
        break;

    case "Beklemede":
        icon = <MdPauseCircle />;
        iconColor = "#9CA3AF";
        break;

    case "Riskli":
        icon = <MdWarning />;
        iconColor = "#DC2626";
        break;

    case "Tamamlandı":
        icon = <MdCheckCircle />;
        iconColor = "#16A34A";
        break;

    case "Bu Hafta Eklenen Rapor":
        icon = <MdDescription />;
        iconColor = "#EAB308";
        break;
    
    case "Yüksek Öncelik":
    icon = <MdFlag />;
    iconColor = "#7C3AED";
    break;

    default:
        icon = <MdFolder />;
        iconColor = "#2563EB";

}

    return (

        <div
    className="dashboard-card"
    style={{ "--card-color": color }}
>

            <div className="card-top">

                <div
    className="icon-box"
    style={{
        backgroundColor: `${iconColor}20`
    }}
>
    <span
        style={{
            color: iconColor
        }}
    >
        {icon}
    </span>
</div>

                <span className="card-title">
                    {title}
                </span>

            </div>

            <div className="card-content">

                <h2>{value}</h2>

            </div>

        </div>

    );

}

export default DashboardCard;