import "./HomePage.css";
import TableComponent from "../../components/table/TableComponent";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">HomePage</h1>
      <div className="homepage-body">
        <TableComponent />
      </div>
    </div>
  );
};

export default HomePage;
