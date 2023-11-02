import { Input, InputProps } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props extends InputProps {
  label: string;
  placeholder: string;
  description?: string;
}

const FormInput = (props: Props) => {
  const { label, placeholder, description } = props;

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...props} placeholder={placeholder} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default FormInput;
