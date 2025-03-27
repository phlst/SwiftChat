import Header from "./Header";

function Layout({
  children1,
  children2,
}: {
  children1: React.ReactNode;
  children2: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-full md:max-w-72 lg:max-w-132 lg:w-[40%] bg-background h-full">
        <Header />
        {children1}
      </div>
      <div className=" border-l-2 border-shader  hidden md:block grow bg-background">
        {children2}
      </div>
    </div>
  );
}

export default Layout;
