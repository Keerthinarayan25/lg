import Image from "next/image";

export default function HeroSection(){
  return(
    <div className="relative w-full h-[626px] lg:h-[570px] pb-30px">
      <div className="relative w-full h-full">
        <Image
        src="/monitor/MonitorBanner.jpeg"
        alt="monitor-banner"
        fill
        className="object-cover"
        />
      </div>
      

    </div>
  )
}