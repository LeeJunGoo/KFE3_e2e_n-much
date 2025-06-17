import Badge, { BADGE_VARIANTS, BadgeKey } from '@repo/ui/Badge';
import type { Meta, StoryObj } from '@storybook/nextjs';

export default {
  title: 'Components/Common/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      control: { type: 'select' },
      options: Object.keys(BADGE_VARIANTS) as BadgeKey[],
      description: '뱃지 타입을 선택하세요'
    }
  }
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    title: 'BEST'
  }
};

// 각 타입별 스토리
export const Best: Story = {
  args: {
    title: 'BEST'
  }
};

export const Urgent: Story = {
  args: {
    title: 'URGENT'
  }
};

// 모든 뱃지 타입 보기
export const AllTypes: Story = {
  args: {
    title: 'BEST'
  },
  render: () => (
    <div className="flex gap-4 items-center">
      {(Object.keys(BADGE_VARIANTS) as BadgeKey[]).map((key, index) => (
        <Badge key={index} title={key} />
      ))}
    </div>
  )
};
