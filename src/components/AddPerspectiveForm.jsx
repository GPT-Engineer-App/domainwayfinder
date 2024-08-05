import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useSupabaseAuth } from "../integrations/supabase/auth";
import FileUploadForm from "./FileUploadForm";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Perspective name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const AddPerspectiveForm = ({ domainId, onAddPerspective }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useSupabaseAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await onAddPerspective({
        ...values,
        createdBy: session?.user?.id,
      });
      form.reset();
    } catch (error) {
      console.error('Error adding perspective:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Add New Perspective</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perspective Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter perspective name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a unique name for your perspective.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your perspective"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of your perspective.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Perspective"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddPerspectiveForm;
