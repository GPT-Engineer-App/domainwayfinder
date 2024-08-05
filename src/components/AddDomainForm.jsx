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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Domain name must be at least 2 characters.",
  }),
  type: z.enum(["Trust", "Knowledge", "Tools", "Exchange"], {
    required_error: "Please select a domain type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  perspectives: z.array(z.string()).optional(),
});

const AddDomainForm = ({ onAddDomain, onCancel }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
    },
  });

  const onSubmit = (values) => {
    onAddDomain(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter domain name" {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique name for your domain.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a domain type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Trust">Trust</SelectItem>
                  <SelectItem value="Knowledge">Knowledge</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Exchange">Exchange</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the type that best describes your domain.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="perspectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perspectives (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter perspectives, separated by commas" {...field} onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))} />
              </FormControl>
              <FormDescription>
                Add perspectives related to this domain type, separated by commas.
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
                  placeholder="Describe your domain"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description of your domain.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Domain</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddDomainForm;
