/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import UserPage from "views/UserPage.js";
import Productos from "views/Productos.jsx";
import Sucursales from "views/Sucursales.jsx";
import Checkout from "views/Checkout.jsx";
import AdminProductos from "views/AdminProductos.jsx";

var dashRoutes = [
  {
    path: "/productos",
    name: "Productos",
    icon: "design_app",
    component: Productos,
    layout: "/admin",
  },
  {
    path: "/admin-productos",
    name: "Admin. Productos",
    icon: "design_app",
    component: AdminProductos,
    layout: "/admin",
  },
  {
    path: "/sucursales",
    name: "Sucursales",
    icon: "business_bank",
    component: Sucursales,
    layout: "/admin",
  },
  {
    path: "/checkout",
    name: "Checkout",
    icon: "files_paper",
    component: Checkout,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/admin",
  },
];
export default dashRoutes;
