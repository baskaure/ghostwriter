"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import { testAccounts } from "@/data/auth";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      form.setError("root", {
        message: err instanceof Error ? err.message : "Une erreur est survenue",
      });
    }
  };

  const handleTestAccount = (testEmail: string, testPassword: string) => {
    form.setValue("email", testEmail);
    form.setValue("password", testPassword);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
        <CardDescription>
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
          <Input
            type="email"
            placeholder="vous@exemple.com"
                      disabled={form.formState.isSubmitting}
                      {...field}
          />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
          <div className="flex items-center justify-between">
                    <FormLabel>Mot de passe</FormLabel>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </Form>

        <div className="space-y-2 rounded-lg border bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground">
            Comptes de test :
          </p>
          <div className="space-y-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() =>
                handleTestAccount(
                  testAccounts.pro.email,
                  testAccounts.pro.password
                )
              }
            >
              {testAccounts.pro.email} (Pro)
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() =>
                handleTestAccount(
                  testAccounts.free.email,
                  testAccounts.free.password
                )
              }
            >
              {testAccounts.free.email} (Free)
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Ou</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" disabled>
            Google
          </Button>
          <Button variant="outline" type="button" disabled>
            LinkedIn
          </Button>
        </div>
        <div className="text-center text-sm">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-primary hover:underline">
            S'inscrire
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
