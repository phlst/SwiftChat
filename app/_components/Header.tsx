// import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

function Header() {
  return (
    <div className="h-full pt-2  pb-5 w-5 flex flex-col justify-between items-center">
      <div className="flex flex-col gap-6">
        <Link
          className="bg-background/20 flex justify-center items-center rounded-xl w-10 h-10"
          href="/messenger"
        >
          <ChatBubbleOvalLeftIcon color="white" height={26} width={26} />
        </Link>
        <Link
          className=" flex justify-center items-center rounded-xl w-10 h-10"
          href="/marketplace"
        >
          <BuildingStorefrontIcon color="white" height={26} width={26} />
        </Link>
      </div>
      <Link
        className="flex justify-center items-center rounded-xl w-10 h-10"
        href="/setting"
      >
        <Cog6ToothIcon color="white" height={26} width={26} />
      </Link>
    </div>
  );
}

export default Header;
