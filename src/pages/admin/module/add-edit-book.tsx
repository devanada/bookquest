import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-formfield";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import { Book, BookSchema, bookSchema } from "@/utils/apis/books";
import { categories } from "@/utils/constant";

interface Props {
  children: ReactNode;
  editData?: Book;
  onSubmit: (data: BookSchema) => void;
}

const AddEditBook = (props: Props) => {
  const { children, editData, onSubmit } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      cover_image: "",
      author: "",
      isbn: "",
      category: "",
      description: "",
    },
  });

  useEffect(() => {
    setEditData();
  }, [editData, form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      setOpen(false);
      form.reset();
    }
  }, [form.formState]);

  function setEditData() {
    if (editData) {
      form.setValue("title", editData.title);
      form.setValue("author", editData.author);
      form.setValue("isbn", editData.isbn);
      form.setValue("category", editData.category);
      form.setValue("description", editData.description);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} key={editData?.id}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit a Book" : "Add a Book"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField control={form.control} name="title" label="Title">
              {(field) => (
                <Input
                  placeholder="Title book"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="cover_image"
              label="Cover Image"
            >
              {(field) => (
                <Input
                  type="file"
                  accept="image/*"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (e.target.files !== null) {
                      field.onChange(e.target.files[0]);
                    } else {
                      field.onChange("");
                    }
                  }}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="author"
              label="Author"
            >
              {(field) => (
                <Input
                  placeholder="Author"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="isbn" label="ISBN">
              {(field) => (
                <Input
                  placeholder="ISBN"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                />
              )}
            </CustomFormField>
            <CustomFormSelect
              control={form.control}
              name="category"
              label="Category"
              placeholder="Select a Category"
              options={categories}
            />
            <CustomFormField
              control={form.control}
              name="description"
              label="Description"
            >
              {(field) => (
                <Textarea
                  placeholder="Description"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                />
              )}
            </CustomFormField>
            <DialogFooter>
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
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBook;
