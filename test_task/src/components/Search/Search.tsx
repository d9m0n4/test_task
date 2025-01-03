import './Search.scss';

type SearchPropsT = {
  searchTerm: string;
  onSearch: (value: string) => void;
};
export const Search = ({ onSearch, searchTerm }: SearchPropsT) => {
  return (
    <div className="products__search">
      <input
        type="text"
        placeholder="Поиск по товарам..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
