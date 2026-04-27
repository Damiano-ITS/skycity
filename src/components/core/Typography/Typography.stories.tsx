import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Core/Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    variant: 'body-md',
    weight: 'regular',
    color: 'main',
    align: 'left',
    children: 'SkyCity Typography System',
  },
  argTypes: {
    variant: {
      description: 'Stile visuale del testo',
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-lg', 'body-md', 'body-sm', 'caption', 'overline'],
    },
    weight: {
      description: 'Peso del carattere',
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
    },
    color: {
      description: 'Colore basato sui token del brand',
      control: 'select',
      options: ['main', 'light', 'primary', 'error', 'success', 'white'],
    },
    align: {
      description: 'Allineamento orizzontale',
      control: 'radio',
      options: ['left', 'center', 'right'],
    },
    component: {
      description: 'Tag HTML sottostante per la semantica SEO/A11Y',
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {};

export const PrimaryHeading: Story = {
  args: {
    variant: 'h1',
    weight: 'bold',
    color: 'primary',
    children: 'Titolo di Pagina',
  },
};

export const ErrorMessage: Story = {
  args: {
    variant: 'body-sm',
    weight: 'medium',
    color: 'error',
    children: 'Si è verificato un errore critico.',
  },
};