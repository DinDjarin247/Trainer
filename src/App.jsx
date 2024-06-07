import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProfIndex from "./components/ProfIndex";
import Home from "./components/Home"; // 새로운 Home 컴포넌트를 생성
import Gallery from "./components/Gallery";
import Kindergarden from "./ProgamIntroduce.jsx/Kindergarden";
import ElementLow from "./ProgamIntroduce.jsx/ElementLow";
import ElementHigh from "./ProgamIntroduce.jsx/ElemetHigh";
import Footer from "./components/Footer";
import TrainingIndex from "./Training/TrainingIndex";
import ProfSearch from "./components/ProfSearch";
import "@/App.css";
import ProfUpdate from "./components/ProfUpdate";
import TrainingJoin from "./Training/TrainingJoin";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/profindex" element={<ProfIndex />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/kindergarden" element={<Kindergarden />} />
        <Route path="/ElementLow" element={<ElementLow />} />
        <Route path="/ElementHigh" element={<ElementHigh />} />
        <Route path="/TrainingIndex" element={<TrainingIndex />} />
        <Route path="/search" element={<ProfSearch />} />
        <Route path="/ProfUpdate" element={<ProfUpdate />} />
        <Route path="/ProfJoin" element={<TrainingJoin />} />
        <Route path="/" element={<Home />} /> {/* Home 컴포넌트와 연결 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
