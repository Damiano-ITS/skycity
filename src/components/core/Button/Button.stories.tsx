import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Core/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Action',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Action',
    variant: 'secondary',
    size: 'medium',
  },
};
