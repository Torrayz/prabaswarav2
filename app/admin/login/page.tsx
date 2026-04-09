"use client";

import { login } from "@/app/actions/auth";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError("Login gagal: " + result.error);
      setIsLoading(false);
    }
    // Jika sukses, Server Action yang akan me-redirect-nya.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-navy/5 rounded-2xl flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-navy">
            Admin Panel
          </h1>
          <p className="text-navy-400 font-body text-sm mt-2">
            Masuk untuk mengelola website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm font-medium text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-navy mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-navy-100 focus:outline-none focus:border-gold transition-colors"
              placeholder="admin@prabaswara.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-navy mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-navy-100 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gold text-navy-dark hover:bg-gold-light"
            isLoading={isLoading}
          >
            Masuk ke Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
