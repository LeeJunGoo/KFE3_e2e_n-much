import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useWatch } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { DetailFormType } from 'src/entities/episode/schemas';

type FormDescriptionType = {
  control: Control<DetailFormType>;
  descriptionLabel: string;
  placeholder: string;
  maxDescLength: number;
};

const FormDescription = ({ control, descriptionLabel, placeholder, maxDescLength }: FormDescriptionType) => {
  const description = useWatch({ control, name: 'description' });
  const descTextColor = description.length >= maxDescLength ? 'text-(--color-red)' : 'text-(--color-warm-gray)';

  return (
    <FormField
      control={control}
      name="description"
      render={({ field, fieldState, formState }) => (
        <FormItem className="">
          <FormLabel className="flex gap-0.5">
            <p className="text-black">{descriptionLabel}</p>
            <span className="text-(--color-red) translate-y-0.5">&#42;</span>
          </FormLabel>
          <div className="relative mt-2">
            <FormControl>
              <Textarea
                {...field}
                className="h-51 aria-invalid:border-1 aria-invalid:border-(--color-red) w-full resize-none break-all bg-white p-3.5"
                placeholder={placeholder}
                rows={4}
              ></Textarea>
            </FormControl>
          </div>
          <div className="relative">
            {formState.isSubmitted && fieldState.error && <FormMessage />}
            <p className={`absolute right-0 top-0 text-xs font-semibold ${descTextColor}`}>
              {description.length}/{maxDescLength}
            </p>
          </div>
        </FormItem>
      )}
    ></FormField>
  );
};

export default FormDescription;
