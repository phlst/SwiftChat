import Header from "./Header";

function Layout({
  children1,
  children2,
}: {
  children1: React.ReactNode;
  children2: React.ReactNode;
}) {
  return (
    <div className="flex h-screen gap-5 lg:p-4 bg-zinc-700">
      <Header />
      <div className="w-full md:max-w-72 rounded-xl lg:max-w-132 lg:w-[40%] bg-background h-full flex ">
        <div className="pt-5 flex-grow overflow-hidden">{children1}</div>
      </div>
      <div className="border-l-2 border-shader/20 rounded-xl hidden md:block grow bg-background">
        {children2}
      </div>
    </div>
  );
}

export default Layout;
