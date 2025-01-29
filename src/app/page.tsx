import Hero from "@/Components/Home/Hero";
import WebHostingPlan from "@/Components/Home/WebHostingPlan";
import { Metadata } from "next";
const HomePge = () => {
  return (
    <section>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold mb-5 ">
        Choose Your Web Hosting Plan
      </h2>
      <div className="container m-auto flex justify-center items-center ny-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
};

export default HomePge;
export const metadata: Metadata = {
  title: "Home page",
  description: "This is the homepage",
};
