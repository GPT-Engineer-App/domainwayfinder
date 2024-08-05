import { SupabaseAuthUI } from "../integrations/supabase/auth";

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <SupabaseAuthUI />
    </div>
  );
};

export default LoginPage;
