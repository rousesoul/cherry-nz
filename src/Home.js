import FileUpload from "./components/FileUpload";
import WeatherForecast from "./WeatherForecast";

const Home = () => {
  return (
    <div className="container" style={{ width: "1200px" }}>
      <div className="mt-3">
        <h2>Welcome to Cherry NZ!</h2>
        <h4>React Hooks File Upload</h4>
      </div>

      <FileUpload />

      <WeatherForecast />
    </div>
  );
};

export default Home;