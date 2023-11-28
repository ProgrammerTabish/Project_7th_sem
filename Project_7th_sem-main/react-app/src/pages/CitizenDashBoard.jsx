import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
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
        <div id="tracker-number">Phone Number: 8274568191</div>

        <div className="change-password-form">
          <h2>Change Password</h2>
          <form>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />

            <button type="submit">Change Password</button>
          </form>
        </div>
      </main>
    </>
  );
}

function ComplainsComp() {
  let [options, changeOption] = useState(0);
  let HandleChange = (val) => {
    changeOption(val);
  };

  function FileComplain() {
    return (
      <>
        <section>
          <form onSubmit={console.log("submitted")}>
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="location">Location of the Issue:</label>
            <input type="text" id="location" name="location" required />

            <label htmlFor="complaint">Complaint Details:</label>
            <textarea
              id="complaint"
              name="complaint"
              rows="4"
              required
            ></textarea>

            <button type="submit">Submit Complaint</button>
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
