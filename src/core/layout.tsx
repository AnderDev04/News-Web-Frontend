import Footer from "./news/components/Footer";
import Navbar from "./news/components/Navbar";

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="dark:text-white max-sm:px-5 bg-gray-50  min-h-screen text-black font-semibold text-2xl">
                <section >
                    {children}
                </section>
            </div>
            <Footer />
        </>
    )
}