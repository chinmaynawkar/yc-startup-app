import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from '@/constants';

const Page = async () => {
  // Check if user is authenticated
  const session = await auth();

  if (!session) redirect(ROUTES.HOME);

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default Page;