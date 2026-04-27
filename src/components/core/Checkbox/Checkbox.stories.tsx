import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accetto i termini di servizio',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Opzione già selezionata',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Checkbox disabilitata',
    checked: false,
    disabled: true,
  },
};