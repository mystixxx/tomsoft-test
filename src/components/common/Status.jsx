function Status({ isActive }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 ${
        isActive
          ? 'bg-[#DCFCE7] text-[#166534] border-2 border-[#BBF7D0]'
          : 'bg-[#FEE2E2] text-[#991B1B] border-2 border-[#FECACA]'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${
        isActive ? 'bg-[#166534]' : 'bg-[#991B1B]'
      }`}></span>
      {isActive ? 'Da' : 'Ne'}
    </span>
  );
}

export default Status; 