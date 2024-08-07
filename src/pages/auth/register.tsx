import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { CustomFormField } from "@/components/custom-formfield";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { registerSchema, RegisterSchema } from "@/utils/types/auth";
import { userRegister } from "@/utils/apis/auth";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      phone_number: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const result = await userRegister(data);
      toast({
        description: result.message,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Layout centerX centerY>
      <Card className="w-full md:w-3/4 lg:w-1/2">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register your account now to get full access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              data-testid="form-register"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <CustomFormField
                control={form.control}
                name="full_name"
                label="Full Name"
              >
                {(field) => (
                  <Input
                    placeholder="John Doe"
                    data-testid="input-full-name"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <Input
                    placeholder="name@mail.com"
                    type="email"
                    data-testid="input-email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
              >
                {(field) => (
                  <Input
                    placeholder="Password"
                    type="password"
                    data-testid="input-password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="repassword"
                label="Retype Password"
              >
                {(field) => (
                  <Input
                    placeholder="Retype Password"
                    type="password"
                    data-testid="input-repassword"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="address"
                label="Address"
              >
                {(field) => (
                  <Input
                    placeholder="Address"
                    data-testid="input-address"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="phone_number"
                label="Phone Number"
              >
                {(field) => (
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    data-testid="input-phone-number"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
              <CardFooter className="grid gap-6">
                <Button
                  type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Register"
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
                  data-testid="btn-navigate-login"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Register;
