import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
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
    defaultValues: {
      email: "",
      password: "",
    },
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
    <Layout centerX centerY>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account using email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <Input {...field} placeholder="name@mail.com" type="email" />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
              >
                {(field) => (
                  <Input {...field} placeholder="Password" type="password" />
                )}
              </CustomFormField>
              <CardFooter className="grid gap-6">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Login;
