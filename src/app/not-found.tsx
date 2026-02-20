import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
            <h1 className="font-serif text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-lg text-muted-foreground mb-8">
                This page doesn&apos;t exist. Let&apos;s get you back to exploring art.
            </p>
            <Link
                href="/"
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
            >
                Back to ArtRoot
            </Link>
        </div>
    );
}
