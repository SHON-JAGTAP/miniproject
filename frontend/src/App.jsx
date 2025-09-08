import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import DashboardUser from "./pages/DashboardUser";
import DashboardOwner from "./pages/DashboardOwner";
import Home from "./pages/Home";
import Places from "./components/Places/Places";
import Blogs from "./pages/Blogs";
import FAQ from "./pages/FAQ";
import TurfContacts from "./pages/TurfContacts";
import About from "./pages/About";
import CricketTurfInfo from "./pages/turfinfo/CricketTurfInfo";
import FootballTurfInfo from "./pages/turfinfo/FootballTurfInfo";
import HockeyTurfInfo from "./pages/turfinfo/HockeyTurfInfo";
import RugbyTurfInfo from "./pages/turfinfo/RugbyTurfInfo";
import GolfTurfInfo from "./pages/turfinfo/GolfTurfInfo";
import TennisTurfInfo from "./pages/turfinfo/TennisTurfInfo";
import AddTurf from "./pages/AddTurf";
import BookNow from "./pages/BookNow";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout"; // ✅ Import Layout
import ViewProfile from "./pages/profile/ViewProfile";
import EditProfile from "./pages/profile/EditProfile";
import ChangePassword from "./pages/profile/ChangePassword";



function App() {
  return (
    <Routes>
      {/* Default route to redirect to signin */}
      <Route path="/" element={<Navigate to="/signin" />} />

      {/* Authentication pages outside Layout (no Navbar/Footer) */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Pages with Navbar + Footer */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<TurfContacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<BookNow />} />
        <Route path="/profile" element={<ViewProfile />} />
<Route path="/profile/edit" element={<EditProfile />} />
<Route path="/profile/change-password" element={<ChangePassword />} />

        

        {/* Turf Info pages */}
        <Route path="/turf/cricket" element={<CricketTurfInfo />} />
        <Route path="/turf/football" element={<FootballTurfInfo />} />
        <Route path="/turf/hockey" element={<HockeyTurfInfo />} />
        <Route path="/turf/rugby" element={<RugbyTurfInfo />} />
        <Route path="/turf/golf" element={<GolfTurfInfo />} />
        <Route path="/turf/tennis" element={<TennisTurfInfo />} />

        {/* Dashboard and owner add turf */}
        <Route
          path="/dashboard-user"
          element={
            <ProtectedRoute allowedRole="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard-owner" element={<DashboardOwner />} />
        <Route path="/add-turf" element={<AddTurf />} />
      </Route>
    </Routes>
  );
}

export default App;
