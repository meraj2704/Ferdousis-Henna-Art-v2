import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("@/components/LandingPage/Hero"));

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}
