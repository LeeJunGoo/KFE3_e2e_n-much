const SearchBar = () => {
  return (
    <div className="fixed right-0 bottom-16 left-0 z-50 m-auto max-w-2xl bg-white p-3 shadow">
      <input type="text" placeholder="검색어를 입력하세요" className="w-full rounded border px-4 py-2" autoFocus />
    </div>
  );
};

export default SearchBar;
