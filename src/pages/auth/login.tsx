import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";
import Layout from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";

import { LoginType, loginSchema, userLogin } from "@/utils/apis/auth";
import { useToken } from "@/utils/contexts/token";

const Login = () => {
  const { changeToken } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginType) {
    try {
      const result = await userLogin(data);
      changeToken(result.payload?.token);
      toast({
        description: "Hello, welcome back!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInput label="Email" placeholder="name@mail.com" {...field} />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormInput
                label="Password"
                placeholder="password"
                type="password"
                {...field}
              />
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Layout>
  );
};

export default Login;
