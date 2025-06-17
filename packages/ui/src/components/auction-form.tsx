'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageTitle from './typography/PageTitle';

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

export default function AuctionForm() {
  const searchParams = useSearchParams();
  const auctionIdParam = searchParams.get('auction_id');
  const mode = auctionIdParam ? '등록하기' : '수정하기';
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      address: '',
      description: ''
    }
  });

  useEffect(() => {
    async function setFormDefaultValues(auctionId: string | null) {
      if (!auctionId) {
        form.reset({ title: '', address: '', description: '' });
        setIsLoading(false);
        return;
      }

      const fetchUrl = `http://localhost:3001/api/auctions?auction_id=${auctionId}`;
      const data = await fetch(fetchUrl);
      const result = await data.json();

      if (result.status === 'success' && result.data.length !== 0) {
        const { title, address, description } = result.data[0];
        form.reset({ title, address, description });
        setIsLoading(false);
      } else {
        form.reset({ title: '', address: '', description: '' });
        setIsLoading(false);
      }
    }

    setFormDefaultValues(auctionIdParam);
  }, [auctionIdParam, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageTitle>상품 정보</PageTitle>
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
          <Button type="submit">{mode}</Button>
        </form>
      </Form>
    </>
  );
}
