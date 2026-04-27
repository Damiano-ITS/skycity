import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Core/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Roles: Story = {
  args: { label: 'Admin', variant: 'info', dot: true },
};

export const Success: Story = {
  args: { label: 'Attivo', variant: 'success', dot: true },
};