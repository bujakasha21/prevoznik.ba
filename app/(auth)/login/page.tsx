"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

//shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Pogrešan email ili lozinka");
        return;
      }

      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      setError("Došlo je do greške, pokušajte ponovo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex min-h-[560px]">
      <div className="hidden md:flex w-1/2 flex-col justify-between p-10 relative overflow-hidden rounded-l-2xl bg-primary-600">
        {/* Slika u pozadini */}
        <Image
          src="/truck.png"
          alt="Prevoz robe"
          fill
          className="object-cover object-right"
        />

        {/* Plavi overlay */}
        <div className="absolute inset-0 bg-primary-900/75" />

        {/* Logo */}
        <div className="relative z-10">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            prevoznik<span className="text-accent-500">.ba</span>
          </h1>
          <p className="text-primary-200 text-sm mt-1">
            Prevoz bez komplikacija!
          </p>
        </div>

        {/* Slogan */}
        <div className="relative z-10">
          <h2 className="text-white text-3xl font-semibold leading-snug">
            Povežite se.
            <br />
            Prevezite.
            <br />
            Završite taj posao!
          </h2>
          <p className="text-primary-200 mt-4 text-sm leading-relaxed">
            Brzo pronađite pouzdanog prevoznika ili prihvatite poslove koji
            odgovaraju vašoj ruti.
          </p>
        </div>

        {/* Statistike */}
        <div className="relative z-10 flex gap-6">
          <div>
            <p className="text-white text-2xl font-bold">500+</p>
            <p className="text-primary-200 text-xs">Prevoznika</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">2000+</p>
            <p className="text-primary-200 text-xs">Prevoza</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">4.9</p>
            <p className="text-primary-200 text-xs">Prosječna ocjena</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Prijava</h2>
          <p className="text-slate-500 text-sm mt-1">
            Unesite vaše podatke za prijavu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vas@email.com"
              required
              className="border-slate-200 focus:border-primary-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">
              Lozinka
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="border-slate-200 focus:border-primary-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white"
          >
            {loading ? "Prijava u toku..." : "Prijavi se"}
          </Button>

          <p className="text-sm text-slate-500 text-center">
            Nemate nalog?{" "}
            <Link
              href="/signup"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Registrujte se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
