import { redirect } from 'next/navigation';

export default function Home() {
  // This would typically check the user's role from an auth context
  const userRole = 'admin'; // For demo, default to admin
  
  if (userRole === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/student/dashboard');
  }
}
