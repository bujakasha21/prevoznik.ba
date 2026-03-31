"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { gradoviBiH } from "@/lib/gradovi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");
  const [city, setCity] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Lozinke se ne podudaraju");
      setLoading(false);
      return;
    }

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password,
      phone: formData.get("phone") as string,
      role,
      city,
    };

    if (!data.role) {
      setError("Molimo odaberite tip naloga");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error);
        return;
      }

      router.push("/login?registered=true");
    } catch (error) {
      setError("Došlo je do greške, pokušajte ponovo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-slate-900">
            Registracija
          </CardTitle>
          <CardDescription className="text-slate-500">
            Kreirajte vaš nalog
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">
                Ime i Prezime
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Vaše ime i prezime"
                required
                className="border-slate-200 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail"
                required
                className="border-slate-200 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Lozinka
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Vaša Lozinka"
                required
                minLength={8}
                className="border-slate-200 focus:border-blue-500"
              />
            </div>

            {/* Password Confirm */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700">
                Potvrda Lozinka
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Unesite ponovo Vašu lozinku"
                required
                minLength={8}
                className="border-slate-200 focus:border-blue-500"
                onChange={(e) => {
                  const password = (
                    document.getElementById("password") as HTMLInputElement
                  ).value;
                  if (e.target.value !== password) {
                    setPasswordError("Lozinke se ne podudaraju");
                  } else {
                    setPasswordError(null);
                  }
                }}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Telefon <span className="text-slate-400">(opcionalno)</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Vaš broj telefona"
                className="border-slate-200 focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label className="text-slate-700">Grad</Label>
              <Select onValueChange={setCity}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue placeholder="Odaberite grad" />
                </SelectTrigger>
                <SelectContent>
                  {gradoviBiH.map((grad) => (
                    <SelectItem key={grad} value={grad}>
                      {grad}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label className="text-slate-700">Tip naloga</Label>
              <Select onValueChange={setRole}>
                <SelectTrigger className="border-slate-200">
                  <SelectValue placeholder="Odaberite tip naloga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KORISNIK">Trebam prevoz</SelectItem>
                  <SelectItem value="PREVOZNIK">Prevoznik sam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {loading ? "Kreiranje naloga..." : "Kreiraj nalog"}
            </Button>

            <p className="text-sm text-slate-500 text-center">
              Već imate nalog?{" "}
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Prijavite se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
