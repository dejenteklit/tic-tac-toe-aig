import React from "react";
import Cookies from "universal-cookie";

function Logout({ onLogout }) {
  const cookies = new Cookies();

  const handleLogout = async () => {
    try {
      // Include the token in the request headers using the "Authorization" header
      const response = await fetch("http://localhost:50005/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          userName: cookies.get("username"),
          password: "", // Include the password if required by the server
        }),
      });

      if (response.ok) {
        console.log('Logout successful');
        // Clear cookies
        cookies.remove("token");
        cookies.remove("username");
        onLogout(); // Trigger the parent component action
      } else {
        console.error('Logout failed:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle logout failure, e.g., display an error message
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
