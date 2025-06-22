import { FaBell } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="w-full bg-blue-400 h-16 px-5">
      <ul className="h-full flex items-center justify-between text-white ">
        <div className="text-lg font-bold">LOGO</div>
        <button className="relative">
          <FaBell size={20} />
        </button>
      </ul>
    </header>
  );
}
