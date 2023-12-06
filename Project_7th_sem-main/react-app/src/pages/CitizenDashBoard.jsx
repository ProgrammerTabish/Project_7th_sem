import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import LogoutButton from "./LogoutButton";
import LocationPicker from "./LocationPicker";
useEffect;
useState;
const CitizenDashBoard = () => {
  let [activeNum, change] = useState(1);
  let handleLink = (num) => {
    change(num);
  };

  return (
    <div>
      <header>
        <h1>Citizen Dashboard</h1>
      </header>
      <NavComop
        activeLink={activeNum}
        handleLink={handleLink}
        val={["Profile", "Complains", "History"]}
      />
      {activeNum == 1 ? <ProfileComp /> : null}
      {activeNum == 2 ? <ComplainsComp /> : null}
      {activeNum == 3 ? <HistoryComp /> : null}
      <footer>
        <p>&copy; 2023 Change Password Page</p>
      </footer>
    </div>
  );
};

function NavComop({ activeLink, val, handleLink }) {
  return (
    <>
      <nav>
        <a
          style={{ textDecoration: activeLink === 1 ? "underline" : "none" }}
          href="#"
          onClick={() => handleLink(1)}
        >
          {val[0]}
        </a>
        <a
          style={{ textDecoration: activeLink === 2 ? "underline" : "none" }}
          href="#"
          onClick={() => handleLink(2)}
        >
          {val[1]}
        </a>
        <a
          style={{ textDecoration: activeLink === 3 ? "underline" : "none" }}
          href="#"
          onClick={() => handleLink(3)}
        >
          {val[2]}
        </a>{" "}
        <LogoutButton />
      </nav>{" "}
    </>
  );
}

function ProfileComp() {
  return (
    <>
      <main>
        <div id="tracker-number">
          Phone Number: {JSON.parse(sessionStorage.user).phone} (
          {JSON.parse(sessionStorage.user).title})
        </div>

        <ChangePasswordForm />
      </main>
    </>
  );
}

function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      console.error("Passwords do not match");
      return;
    }

    try {
      // Make an API call to update the password
      let title = JSON.parse(sessionStorage.user).title;
      let phone = JSON.parse(sessionStorage.user).phone;
      await axios.post("http://localhost:3001/change-password", {
        title,
        phone,
        newPassword,
      });

      // Optionally, you can handle success (e.g., show a success message)
      alert("Password changed successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)

      console.error("Error changing password:", error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

function ComplainsComp() {
  let [options, changeOption] = useState(0);
  let HandleChange = (val) => {
    changeOption(val);
  };
  function FileComplain() {
    const [selectedLocation, setSelectedLocation] = useState([0, 0]);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submitted", {
        name: e.target.name.value,
        location: selectedLocation,
        complaint: e.target.complaint.value,
      });
      // Add logic to send the complaint data to your server
    };

    return (
      <>
        <section className="min-h-screen flex items-center justify-center p-6">
          <form
            className="max-w-screen-md w-full bg-white p-8 rounded-md shadow-md"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            <div className="p-2 m-7">
              <label className="p-2 m-2"> Pick a location on the map :</label>
              <LocationPicker />
            </div>
            <label
              htmlFor="complaint"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Complaint Details:
            </label>
            <textarea
              id="complaint"
              name="complaint"
              rows="4"
              required
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit Complaint
            </button>
          </form>
        </section>
      </>
    );
  }

  function TrackVan() {
    useEffect(() => {
      // Function to initialize the map
      const initMap = () => {
        // Set the default location to a specific latitude and longitude
        const defaultLocation = { lat: 40.7128, lng: -74.006 };

        // Create a map centered at the default location
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: defaultLocation,
        });

        // Add a marker at the default location
        new window.google.maps.Marker({
          position: defaultLocation,
          map: map,
          title: "Van Location",
        });
      };

      // Load the Google Maps API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.defer = true;
      script.async = true;

      document.head.appendChild(script);

      return () => {
        // Clean up the script tag on component unmount
        document.head.removeChild(script);
      };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
      <>
        <main>
          <div
            id="map"
            style={{
              height: "400px",
              width: "100%",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          ></div>

          <div className="tracking-info">
            <h2>Current Location</h2>
            <p>Latitude: 40.7128</p>
            <p>Longitude: -74.0060</p>
            <p>Last Update: 2023-11-14 12:30 PM</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <button
        className="complainButton"
        style={{ textDecoration: options === 0 ? "underline" : "none" }}
        onClick={() => HandleChange(0)}
      >
        + File Complain
      </button>
      <button
        className="complainButton"
        style={{ textDecoration: options === 1 ? "underline" : "none" }}
        onClick={() => HandleChange(1)}
      >
        Track Grabage Van
      </button>
      {options == 0 ? <FileComplain /> : null}
      {options == 1 ? <TrackVan /> : null}
    </>
  );
}
function HistoryComp() {
  return (
    <>
      <main>
        <div className="dashboard-item">
          <h2>Complain History</h2>
          <ul className="complaints-list">
            <li className="complaint">
              <strong>Issue:</strong> Van is not on time
              <br />
              <strong>Status:</strong> In Progress
            </li>
            <li className="complaint">
              <strong>Issue:</strong> Van didn't come today
              <br />
              <strong>Status:</strong> Open
            </li>
            {/* Add more complaints as needed */}
          </ul>
        </div>
      </main>
    </>
  );
}
export default CitizenDashBoard;
