import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Core/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Nome Utente',
    placeholder: 'Inserisci il tuo username...',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Digitare password segreta',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'email-sbagliata',
    error: 'Formato email non valido.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo Bloccato',
    disabled: true,
    placeholder: 'Non puoi scrivere qui',
  },
};