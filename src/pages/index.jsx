import Image from "next/image";
import { Inter } from "next/font/google";
import VideoPlayer from "@/components/VideoPlayer";
import Options from "@/components/Options";
import Notifications from "@/components/Notifications";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <p className="text-6xl">Video Chat</p>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </div>
    </div>
  );
}
