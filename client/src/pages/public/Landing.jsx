import { Header } from "../../components/ui/Header";
import { Hero } from "../../components/ui/Hero";
import { Features } from "../../components/ui/Features";
import { CTA } from "../../components/ui/CTA";
import { Footer } from "../../components/ui/Footer";

/**
 * Componente Landing.
 *
 * Representa la página principal (home) de la aplicación.
 * Está compuesta únicamente por componentes de UI.
 *
 * @component
 * @returns {JSX.Element} Página de inicio de la aplicación
 */
export const Landing = () => {
    return (
        <>
            {/* Encabezado principal */}
            <Header />

            {/* Sección hero (mensaje principal) */}
            <Hero />

            {/* Sección de características */}
            <Features />

            {/* Llamado a la acción */}
            <CTA />

            {/* Pie de página */}
            <Footer />
        </>
    );
};
