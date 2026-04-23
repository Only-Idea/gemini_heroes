import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/routing';

// Locale-aware navigation helpers. `useRouter().replace(pathname, { locale })`
// handles the `localePrefix: 'as-needed'` rule and the `NEXT_LOCALE` cookie
// automatically — switching to the default locale correctly strips the prefix.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
