import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-formfield";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { bookSchema, BookSchema, IBook } from "@/utils/types/books";
import { categories } from "@/utils/constant";

interface Props {
  children: ReactNode;
  editData?: IBook;
  onSubmit: (data: BookSchema) => void;
}

const AddEditBook = (props: Props) => {
  const { children, editData, onSubmit } = props;

  const [open, setOpen] = useState(false);

  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      cover_image: new File([], ""),
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
    let modeType: "add" | "edit" = "add";
    if (editData) {
      modeType = "edit";
      form.setValue("title", editData.title);
      form.setValue("author", editData.author);
      form.setValue("isbn", editData.isbn);
      form.setValue("category", editData.category);
      form.setValue("description", editData.description);
    }
    form.setValue("mode", modeType);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} key={editData?.id}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full md:w-1/2 lg:w-2/3">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit a Book" : "Add a Book"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField control={form.control} name="title" label="Title">
              {(field) => (
                <Input
                  {...field}
                  placeholder="Title book"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
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
                  accept="image/png, image/jpeg, image/jpg"
                  multiple={false}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
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
                  {...field}
                  placeholder="Author"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="isbn" label="ISBN">
              {(field) => (
                <Input
                  {...field}
                  placeholder="ISBN"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
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
                  {...field}
                  placeholder="Description"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
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
