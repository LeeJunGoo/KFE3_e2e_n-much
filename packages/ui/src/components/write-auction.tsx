'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: '경매 제목은 최소 5자가 되어야 합니다.'
    })
    .max(50, {
      message: '경매 제목은 최대 50자가 되어야 합니다.'
    }),
  address: z.string().min(5, { message: '주소는 최소 5글자가 되어야 합니다.' }),
  description: z.string().min(5, { message: '상세 내용은 최소 5글자가 되어야 합니다.' }).max(500, {
    message: '상세 내용은 최대 500자가 되어야 합니다.'
  })
});

export function AuctionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      address: '',
      description: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="경매 상품의 제목을 입력하세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주소</FormLabel>
              <FormControl>
                <Input placeholder="상품 위치 또는 주소를 입력하세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상세 내용</FormLabel>
              <FormControl>
                <Input placeholder="상품에 대한 자세한 설명을 입력하세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
