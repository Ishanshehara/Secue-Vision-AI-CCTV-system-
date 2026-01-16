import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the login page as the initial screen
  return <Redirect href="/auth/login" />;
}
