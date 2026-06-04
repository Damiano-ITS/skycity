import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { AuthProvider } from '../src/context/AuthContext';
import { PERMISSIONS } from '../src/config/permissions';
// import '../src/index.css'; 

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider userPermissions={[PERMISSIONS.SUPER_ADMIN]}>
        <Story />
      </AuthProvider>
    ),
  ],
};

export default preview;