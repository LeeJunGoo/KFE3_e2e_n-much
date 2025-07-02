import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import Image from 'next/image';
import React from 'react';
import DefaultAvatar from 'assets/images/avatarDefault.svg';

type UserAvatarType = {
  src: string;
  alt: string;
  size: 'sm' | 'md' | 'lg' | 'xlg';
  className?: string;
};

const UserAvatar = ({ src, alt, size, className }: UserAvatarType) => {
  const sizes = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
    xlg: 'size-14'
  };

  return (
    <Avatar className={`mr-2 ${sizes[size]} ${className}`}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        <Image src={DefaultAvatar} alt="기본 이미지 입니다." />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
