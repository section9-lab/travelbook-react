import { useLanguage } from "../LanguageContext";

// 搜索组件保持不变
const SearchBar = ({ onSearch }) => {
  const { language } = useLanguage(); // 获取当前语言状态
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const placeholderText = {
    zh: "搜索旅行目的地",
    en: "Search travel destinations",
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        // placeholder="搜索旅行目的地"
        placeholder={placeholderText[language] || placeholderText.en} 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>
      <span>{language === "zh" ? "搜索" : "Search"}</span>
      </button>
    </div>
  );
};

export default SearchBar;
