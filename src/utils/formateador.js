export const capitalizarPalabras = (texto) => {
    if (!texto) return "";

    const palabras = texto.trim().toLowerCase().split(/\s+/);

    return palabras
        .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");
};