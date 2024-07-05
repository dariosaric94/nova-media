import type { Meta, StoryObj } from '@storybook/react';
import { Column } from '../components/Grid/index';

const meta = {
  title: 'Example/Column',
  component: Column,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    xs: 12,
  },
};
