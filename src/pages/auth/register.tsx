import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";
import Layout from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";

import { RegisterType, registerSchema, userRegister } from "@/utils/apis/auth";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterType) {
    try {
      const result = await userRegister(data);
      toast({
        description: result.message,
      });
      navigate("/login");
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
            name="full_name"
            render={({ field }) => (
              <FormInput label="Full Name" placeholder="John Doe" {...field} />
            )}
          />
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
                placeholder="Password"
                type="password"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="repassword"
            render={({ field }) => (
              <FormInput
                label="Retype Password"
                placeholder="Retype Password"
                type="password"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormInput label="Address" placeholder="Address" {...field} />
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormInput
                label="Phone Number"
                placeholder="Phone Number"
                type="number"
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

export default Register;
