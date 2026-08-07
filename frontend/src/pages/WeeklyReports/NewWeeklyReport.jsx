import Layout from "../../components/Layout/Layout";
import WeeklyReportForm from "../../components/weeklyReports/WeeklyReportForm/WeeklyReportForm";

function NewWeeklyReport() {

    return (

        <Layout showHeader={false}>

            <WeeklyReportForm />

        </Layout>

    );

}

export default NewWeeklyReport;