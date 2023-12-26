import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";
import Alert from "@/components/alert";
import { useToast } from "@/components/ui/use-toast";

import { useToken } from "@/utils/contexts/token";
import {
  updateProfile,
  deleteProfile,
  ProfileUpdateType,
  profileUpdateSchema,
} from "@/utils/apis/users";

const EditProfile = () => {
  const { user, changeToken } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileUpdateType>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      full_name: "",
      email: "",
      address: "",
      phone_number: "",
      password: "",
      profile_picture: new File([], ""),
    },
  });

  useEffect(() => {
    form.setValue("full_name", user.full_name!);
    form.setValue("email", user.email!);
    form.setValue("address", user.address!);
    form.setValue("phone_number", user.phone_number!);
  }, [user]);

  async function onSubmit(data: ProfileUpdateType) {
    try {
      const result = await updateProfile(data);
      toast({
        description: result.message,
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  async function onDelete() {
    setIsLoading(true);
    try {
      const result = await deleteProfile();
      toast({
        description: result.message,
      });
      changeToken();
      navigate("/login");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormField
            control={form.control}
            name="full_name"
            label="Full Name"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="John Doe"
                disabled={form.formState.isSubmitting || isLoading}
                aria-disabled={form.formState.isSubmitting || isLoading}
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="email" label="Email">
            {(field) => (
              <Input
                {...field}
                placeholder="name@mail.com"
                type="email"
                disabled={form.formState.isSubmitting || isLoading}
                aria-disabled={form.formState.isSubmitting || isLoading}
                value={field.value as string}
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
                {...field}
                placeholder="Password"
                type="password"
                disabled={form.formState.isSubmitting || isLoading}
                aria-disabled={form.formState.isSubmitting || isLoading}
                value={field.value as string}
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
                {...field}
                placeholder="Address"
                disabled={form.formState.isSubmitting || isLoading}
                aria-disabled={form.formState.isSubmitting || isLoading}
                value={field.value as string}
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
                {...field}
                placeholder="Phone Number"
                type="tel"
                disabled={form.formState.isSubmitting || isLoading}
                aria-disabled={form.formState.isSubmitting || isLoading}
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="profile_picture"
            label="Profile Picture"
          >
            {(field) => (
              <Input
                type="file"
                disabled={form.formState.isSubmitting || isLoading}
                aria-disabled={form.formState.isSubmitting || isLoading}
                onChange={(e) =>
                  field.onChange(e.target.files ? e.target.files[0] : null)
                }
              />
            )}
          </CustomFormField>
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || isLoading}
              aria-disabled={form.formState.isSubmitting || isLoading}
            >
              {form.formState.isSubmitting || isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <Alert
              title="Are you sure?"
              description="This action cannot be undone. This will permanently delete your account."
              onAction={() => onDelete()}
            >
              <Button
                type="button"
                variant="destructive"
                disabled={form.formState.isSubmitting || isLoading}
                aria-disabled={form.formState.isSubmitting || isLoading}
              >
                {form.formState.isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Delete Account"
                )}
              </Button>
            </Alert>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default EditProfile;
