// src/app/page.tsx
import BootGreetingGate from "@/components/BootGreetingGate";
import TitleScreen from "@/components/TitleScreen";
import SectorTransition from "@/components/SectorTransition";
import SignalFromBelow from "@/components/SignalFromBelow";
import CurrentlyRunning from "@/components/CurrentlyRunning";
import DistrictMap from "@/components/DistrictMap";
import Transmission from "@/components/Transmission";

export default function Home() {
  return (
    <>
      <BootGreetingGate />
      <TitleScreen />
      <SectorTransition />
      <SignalFromBelow />
      <CurrentlyRunning />
      <DistrictMap />
      <Transmission />
    </>
  );
}
