import "./WeeklyReportToolbar.css";
import { FaSearch } from "react-icons/fa";

function WeeklyReportToolbar({ aramaMetni, setAramaMetni }) {


    return (

        <div className="weekly-report-toolbar">


            <div className="weekly-search">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Rapor Ara..."
                    value={aramaMetni}
                    onChange={(e) => setAramaMetni(e.target.value)}
                />

            </div>

        </div>

    );

}

export default WeeklyReportToolbar;