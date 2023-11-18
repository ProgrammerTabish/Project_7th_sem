import AdminDashBoard from "./pages/AdminDashBoard";
import CitizenDashBoard from "./pages/CitizenDashBoard";
import VanDashBoard from "./pages/VanDashBoard";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <>
      <WelcomePage />
      <CitizenDashBoard />
      <VanDashBoard />
      <AdminDashBoard />
    </>
  );
}

export default App;
