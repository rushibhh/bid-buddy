import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import helper from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <div className="bg-gray-200 py-2 px-4 md:px-0">
      <div className="container flex justify-between items-center mx-auto">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center hover:underline gap-1">
            <Image
              src="/logo.png"
              width="50"
              height="50"
              alt="Bid-Buddy-Logo"
            />
            <p className="font-semibold text-xl">BidBuddy.com</p>
          </Link>
          <div>
            <Link href="/items/create" className="hover:underline">
              Auction an Items
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>
              {helper.getInitials(session?.user?.name as string)}
            </AvatarFallback>
          </Avatar>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
