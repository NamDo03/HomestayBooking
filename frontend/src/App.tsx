import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LayoutWithSearch from "./layouts/LayoutWithSearch";
import HouseList from "./pages/HouseList";
import ProtectedRoute from "./services/ProtectedRoute";
import HouseDetail from "./pages/HouseDetail";
import CreateHouse from "./pages/CreateHouse";
import FavoritedList from "./pages/FavoritedList";
import ReservationList from "./pages/ReservationList";
import PropertyList from "./pages/PropertyList";
import ScrollToTop from "./hooks/ScrollToTop";
import AdminRoute from "./services/AdminRoute";
import Users from "./pages/Admin/Users";
import Houses from "./pages/Admin/Houses";
import AdminLayout from "./layouts/AdminLayout";
import UpdateHouse from "./pages/Admin/UpdateHouse";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/houses"
          element={
            <LayoutWithSearch>
              <HouseList />
            </LayoutWithSearch>
          }
        />
        <Route
          path="/house/:houseId"
          element={
            <LayoutWithSearch>
              <HouseDetail />
            </LayoutWithSearch>
          }
        />
        <Route
          path="/create-house"
          element={
            <ProtectedRoute>
              <LayoutWithSearch>
                <CreateHouse />
              </LayoutWithSearch>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorited"
          element={
            <ProtectedRoute>
              <LayoutWithSearch>
                <FavoritedList />
              </LayoutWithSearch>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <LayoutWithSearch>
                <ReservationList />
              </LayoutWithSearch>
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <LayoutWithSearch>
                <PropertyList />
              </LayoutWithSearch>
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/houses"
          element={
            <AdminRoute>
              <AdminLayout>
                <Houses />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/house/:houseId/update"
          element={
            <AdminRoute>
              <AdminLayout>
                <UpdateHouse />
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
