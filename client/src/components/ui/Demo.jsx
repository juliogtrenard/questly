import playGif from "../../assets/img/play.gif";
import "./Demo.css";

/**
 * Sección Demo.
 *
 * Muestra un mockup animado de una historia.
 *
 * @component
 * @returns {JSX.Element}
 */
export const Demo = () => {
    return (
        <section className="demo">
            <div className="demo-container">
                <h2 className="demo-title">
                    Tú decides cómo continúa la historia
                </h2>

                <p className="demo-description">
                    Elige qué hace tu personaje y avanza por una narrativa que
                    se adapta a cada una de tus elecciones
                </p>

                <img
                    src={playGif}
                    alt="Historia interactiva"
                    className="demo-gif"
                />
            </div>
        </section>
    );
};
