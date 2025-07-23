import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

//TODO - 파일로 분리하기 (KMH)
interface FormMaxPointProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  maxPointLabel: string;
  placeholder: string;
}

const FormMaxPoint = <T extends FieldValues>({ control, name, maxPointLabel, placeholder }: FormMaxPointProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {maxPointLabel} <span className="text-(--color-red)"> &#42;</span>
          </FormLabel>
          <FormControl>
            <Input className="bg-white" type="number" placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormMaxPoint;
