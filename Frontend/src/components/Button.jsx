function Button({ children, onClick }) {
  return (
    /* From Uiverse.io by Javierrocadev */
    <button
      className="text-l group relative z-10 flex h-9 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-md border-[3px] p-2 font-normal text-[#927AF4]"
      onClick={onClick}
    >
      <span className="relative z-10 transition-colors duration-100 group-hover:text-white">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-100 group-hover:opacity-100">
        {children}
      </span>
      <span className="absolute -left-2 -top-8 h-32 w-36 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-1000 group-hover:scale-x-100 group-hover:duration-500"></span>
      <span className="absolute -left-2 -top-8 h-32 w-36 origin-left rotate-12 scale-x-0 transform bg-purple-400 transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-700"></span>
      <span className="absolute -left-2 -top-8 h-32 w-36 origin-left rotate-12 scale-x-0 transform bg-purple-600 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-1000"></span>
    </button>
  );
}

export default Button;
