// Add this file to your Fuse remote: src/@fuse/services/config/config.bridge.ts
import { InjectionToken, inject, Injector } from '@angular/core';

// Create a bridge token that can fallback to global config
export const FUSE_APP_CONFIG_BRIDGE = new InjectionToken('FUSE_APP_CONFIG_BRIDGE', {
  providedIn: 'root',
  factory: () => {
    // Try to get config from global bridge first
    if (typeof window !== 'undefined' && (window as any).__FUSE_CONFIG__) {
      console.log('Using global Fuse config from shell');
      return (window as any).__FUSE_CONFIG__;
    }

    // Try to get from shell injector
    if (typeof window !== 'undefined' && (window as any).__FUSE_INJECTOR__) {
      try {
        const shellInjector = (window as any).__FUSE_INJECTOR__ as Injector;
        const config = shellInjector.get('FUSE_APP_CONFIG', null);
        if (config) {
          console.log('Using Fuse config from shell injector');
          return config;
        }
      } catch (error) {
        console.warn('Could not get config from shell injector:', error);
      }
    }

    // Fallback to default config
    console.log('Using fallback Fuse config');
    return {
      layout: 'classy',
      scheme: 'light',
      screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px',
      },
      theme: 'theme-default',
      themes: [
        {
          id: 'theme-default',
          name: 'Default',
        },
        {
          id: 'theme-brand',
          name: 'Brand',
        },
        {
          id: 'theme-teal',
          name: 'Teal',
        },
        {
          id: 'theme-rose',
          name: 'Rose',
        },
        {
          id: 'theme-purple',
          name: 'Purple',
        },
        {
          id: 'theme-amber',
          name: 'Amber',
        },
      ],
    };
  }
});

// Export a provider factory that can be used in your Fuse providers
export function provideFuseConfigBridge() {
  return {
    provide: 'FUSE_APP_CONFIG', // This will replace the original token
    useFactory: () => {
      try {
        return inject(FUSE_APP_CONFIG_BRIDGE);
      } catch {
        // Ultimate fallback
        return {
          layout: 'classy',
          scheme: 'light',
          screens: {
            sm: '600px',
            md: '960px',
            lg: '1280px',
            xl: '1440px',
          },
          theme: 'theme-default',
          themes: [
            {
              id: 'theme-default',
              name: 'Default',
            },
            {
              id: 'theme-brand',
              name: 'Brand',
            },
            {
              id: 'theme-teal',
              name: 'Teal',
            },
            {
              id: 'theme-rose',
              name: 'Rose',
            },
            {
              id: 'theme-purple',
              name: 'Purple',
            },
            {
              id: 'theme-amber',
              name: 'Amber',
            },
          ],
        };
      }
    }
  };
}
