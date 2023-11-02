import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";
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

  const form = useForm<ProfileUpdateType>({
    resolver: zodResolver(profileUpdateSchema),
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
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  async function onDelete() {
    try {
      const result = await deleteProfile();
      toast({
        description: result.message,
      });
      changeToken();
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
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormInput
                label="Profile Picture"
                placeholder="Profile Picture"
                type="file"
                {...field}
              />
            )}
          />
          <div className="flex gap-3">
            <Button type="submit">Submit</Button>
            <Alert
              title="Are you sure?"
              description="This action cannot be undone. This will permanently delete your account."
              onAction={() => onDelete()}
            >
              <Button type="button" variant="destructive">
                Delete Account
              </Button>
            </Alert>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default EditProfile;
