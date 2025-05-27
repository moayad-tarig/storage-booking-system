import { Divide } from "lucide-react";
import Image from "next/image";
import Link from "next/link"


export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href={'/storage-units'}>click here to start </Link>
    </div>
  );
}
