import { Button } from "../ui/Button";

export default function BecomeMember() {
  return (
    <section id="become-member" className="bg-accent">
      <div className="flex flex-col h-[50dvh] overflow-hidden justify-center items-center">
        <span className="text-4xl text-charcoal uppercase font-bold">
          Become a member
        </span>
        <span className="text-lg">UNLOCK EXCLUSIVE VOUCHERS</span>
        <div className="flex my-4 gap-2">
          <Button className="py-6 uppercase">Sign Up Now</Button>
          <Button className="py-6 uppercase">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
