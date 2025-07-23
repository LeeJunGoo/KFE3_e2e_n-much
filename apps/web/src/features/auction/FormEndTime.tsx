import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

//TODO - 파일로 분리하기 (KMH)
interface FormEndTimeProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  endTimeLabel: string;
}

const FormEndTime = <T extends FieldValues>({ control, name, endTimeLabel }: FormEndTimeProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            {endTimeLabel}
            <span className="text-(--color-red)">&#42;</span>
          </FormLabel>
          <FormControl>
            <Input className="h-9 bg-white" type="time" step="1" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormEndTime;
