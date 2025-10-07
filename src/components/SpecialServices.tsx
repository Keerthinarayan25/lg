import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { BadgeCheck, CircleDollarSign, DollarSign, Headset, RotateCcw, Truck } from "lucide-react";

export default function SpecialServices() {
  return (
    <div className="flex flex-row justify-around bg-[#e6e1d6] w-full h-250px p-5">
      <div className="flex flex-row gap-2">
        <HoverCard>
          <HoverCardTrigger className="flex flex-row gap-2">
            <Truck />
            Free Delivery
          </HoverCardTrigger>
          <HoverCardContent className="p-5 w-80">
            <h1 className="text-[20px] font-semibold">Free Delivery</h1>
            <p>
              Free, fast delivery straight to your door1. Appliances and TVs over 55&quot; include free delivery to your room of choice with next day available in select areas. Schedule your appointment during checkout. Store pickup and expedited options are available for select items.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex flex-row gap-2">
        <HoverCard>
          <HoverCardTrigger className="flex flex-row gap-2">
            <CircleDollarSign />
            No Interest Financing++
          </HoverCardTrigger>
          <HoverCardContent className="p-5 w-80">
            <h1 className="text-[20px] font-semibold">No Interest Financing++</h1>
            <p>
              $0 down + no interest financing on qualifying orders over $899 if paid in full up to 24 months.++
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex flex-row gap-2">
        <HoverCard>
          <HoverCardTrigger className="flex flex-row gap-2">
            <RotateCcw />
            14 Days Return
          </HoverCardTrigger>
          <HoverCardContent className="p-5 w-80">
            <h1 className="text-[20px] font-semibold">14 Days Return</h1>
            <p>
              Free returns within 14 days of delivery or within 30 days for laptops and vacuums.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex flex-row gap-2">
        <HoverCard>
          <HoverCardTrigger className="flex flex-row gap-2">
            <BadgeCheck />
            Extended Coverage
          </HoverCardTrigger>
          <HoverCardContent className="p-5 w-80">
            <h1 className="text-[20px] font-semibold">Extended Coverage</h1>
            <p>
              All products purchased on LG.com include the manufacturer&apos;s warranty with standard parts and labor included. Additional extended service plans are available.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex flex-row gap-2">
        <HoverCard>
          <HoverCardTrigger className="flex flex-row gap-2">
            <DollarSign />
            Applicances Trade-in Credit
          </HoverCardTrigger>
          <HoverCardContent className="p-5 w-80">
            <h1 className="text-[20px] font-semibold">Applicances Trade-in Credit</h1>
            <p>
              Purchase select kitchen or laundry appliances and receive up to $150 instant savings when you select the “Trade-In” option during checkout.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div>
        <HoverCard>
          <HoverCardTrigger className="flex flex-row gap-2">
            <Headset />
            Chat with an Expert
          </HoverCardTrigger>
          <HoverCardContent className="p-5 w-80">
            <h1 className="text-[20px] font-semibold">Chat with an Expert</h1>
            <p>
              LG Personal Product Experts are available to help you find the product and offer that is right for you. Connect with our live agents.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}