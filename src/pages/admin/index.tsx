import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout";
import AdminBooks from "./module/books";

const Admin = () => {
  return (
    <Layout centerX>
      <Tabs defaultValue="books" className="w-full flex flex-col items-center">
        <TabsList className="w-fit">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="books">
          <AdminBooks />
        </TabsContent>
        <TabsContent className="w-full" value="users">
          <AdminBooks />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Admin;
