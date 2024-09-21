import Link from "next/link";

export default function Home() {
  return (
      <div>
        <h1 className="text-center">TOWER-GAME</h1>
        <Link href="/lobby">Get in Lobby</Link>
      </div>
  );
}
