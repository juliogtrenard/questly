import { Header } from "../../components/ui/Header";
import { Hero } from "../../components/ui/Hero";
import { Features } from "../../components/ui/Features";
import { CTA } from "../../components/ui/CTA";
import { Footer } from "../../components/ui/Footer";
import { Demo } from "../../components/ui/Demo";

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

            {/* MockUp de las historias */}
            <Demo />

            {/* Llamado a la acción */}
            <CTA />

            {/* Pie de página */}
            <Footer />
        </>
    );
};
