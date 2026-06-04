import type { Meta, StoryObj } from "@storybook/react";
import DateSelect from "./DateSelect";

const meta: Meta<typeof DateSelect> = {
  title: "Components/DateSelect",
  component: DateSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    calendarIcon: { control: "text" },
    chevronIcon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DateSelect>;

export const Default: Story = {
  args: {
    calendarIcon: "fa-calendar-days",
    chevronIcon: "fa-chevron-down",
  },
};