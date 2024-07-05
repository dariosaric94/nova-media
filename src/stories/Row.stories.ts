import type { Meta, StoryObj } from '@storybook/react';
import { Row } from '../components/Grid/index';

const meta = {
  title: 'Example/Row',
  component: Row,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    gap: 12,
  },
};
