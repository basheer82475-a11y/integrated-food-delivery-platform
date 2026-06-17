function Loader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
