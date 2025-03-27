// import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

function Header() {
  return (
    <div className="w-full h-22 flex justify-between items-center px-20">
      <Link
        className="w-12 h-12 hover:scale-120 transition-all duration-200 flex justify-center items-center bg-shader rounded-lg"
        href="/messenger"
      >
        <ChatBubbleOvalLeftIcon color="#999393" className=" h-10 w-10" />
      </Link>
      <Link
        className="w-12 h-12 hover:scale-120 transition-all duration-200 flex justify-center items-center bg-shader rounded-lg"
        href="/marketplace"
      >
        <BuildingStorefrontIcon color="#999393" className=" h-10 w-10" />
      </Link>
      <Link
        className="w-12 h-12 hover:scale-120 transition-all duration-200 flex justify-center items-center bg-shader rounded-lg"
        href="/settings"
      >
        <Cog6ToothIcon color="#999393" className=" h-10 w-10" />
      </Link>
    </div>
  );
}

export default Header;
