import { useLanguage } from "../LanguageContext";


// 搜索组件保持不变
const SearchBar = ({ onSearch }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState([]);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="搜索旅行目的地"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>搜索</button>
    </div>
  );
};

export default SearchBar;
