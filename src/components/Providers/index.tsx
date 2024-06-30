import React, { ComponentClass, ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';
import ReduxProvider from './ReduxProvider';
import LocalizationProvider from './LocalizationProvider';
import ReactQueryProvider from './ReactQueryProvider';

const composeProviders =
    (...providers: any) =>
    ({ children }: { children: ReactNode }) =>
        providers.reduceRight((child: ReactNode, ProviderWrapper: ComponentClass) => <ProviderWrapper>{child}</ProviderWrapper>, children);

const Provider = composeProviders(ReduxProvider, ReactQueryProvider, LocalizationProvider, ThemeProvider);

export default Provider;
