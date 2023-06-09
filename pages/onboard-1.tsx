import { Layout } from "@/components/Layout";
import { Roadmap } from "@/components/Roadmap";
import { Button } from '@/components/Button';
import { useRouter } from "next/router";
import splitbee from '@splitbee/web';
import Link from "next/link";

function OnboardPage() {
  const router= useRouter();
  return <Layout>
    <h1 className="text-3xl mt-16 max-xs:mt-0 mb-8">what&apos;s the name of your product?</h1>
    <form onSubmit={(e) => {
      
      e.preventDefault();
      const form = new FormData(e.currentTarget)
      const productName = form.get('productName') as string;
      splitbee.track("onboard: product name", { productName })
      localStorage.setItem("productName", productName);
      router.push('/onboard-2');
    }}>
      <input placeholder="blitz" autoFocus className="mb-5 w-56 bg-transparent border-b-2 px-2" name="productName" />
      <Button data-splitbee-event="onboard: product name" type="submit">Next</Button>
    </form>
  </Layout>
}

export default OnboardPage;