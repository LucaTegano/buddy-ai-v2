import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to the language selection path - let i18n middleware handle the rest
  redirect('/home');
}