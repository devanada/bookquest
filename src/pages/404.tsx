import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout centerX centerY>
      <div className="flex flex-col items-center gap-4">
        <p className="font-bold text-8xl">404</p>
        <p className="tracking-widest font-medium">
          Sorry, we were unable to find that page
        </p>
        <Button asChild>
          <Link to="/">Back to Homepage</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
