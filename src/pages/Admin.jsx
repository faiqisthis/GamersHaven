import React, { useState, useEffect } from "react";
import Stats from "./Stats";
import ProductManagement from "../components/ProductManagement";
import ItemList from "./ItemList";
import { useLocation } from "react-router-dom";

function Admin() {
  return (
    <>
    <ItemList/>
    </>
  );
}

export default Admin;
