import { Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList/ArticleList";
import ArticleDetail from "./components/ArticleDetail/ArticleDetail";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
    </div>
  );
};

export default App;
