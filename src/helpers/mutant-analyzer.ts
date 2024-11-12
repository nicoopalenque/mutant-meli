export function hasMutantSequence(dna: string[]): boolean {
    const dnaLength = dna.length;
    const sequenceLength = 4;
    let sequenceCount = 0;

    function sequence(x: number, y: number, deltaX: number, deltaY: number): boolean {
        const letter = dna[x][y];

        for (let step = 1; step < sequenceLength; step++) {
            const newX = x + step * deltaX;
            const newY = y + step * deltaY;

            // Si estamos fuera de los límites o la letra no coincide, no es una secuencia
            if (newX >= dnaLength || newY >= dnaLength || newY < 0 || dna[newX][newY] !== letter) return false;
        }

        return true;
    }

    // Verifica todas las direcciones desde una posición dada (horizontal, vertical, diagonal derecha e izquierda)
    function checkDirections(x: number, y: number): number {
        let count = 0;

        if (y <= dnaLength - sequenceLength && sequence(x, y, 0, 1)) count++; // Horizontal
        if (x <= dnaLength - sequenceLength && sequence(x, y, 1, 0)) count++; // Vertical
        if (x <= dnaLength - sequenceLength && y <= dnaLength - sequenceLength && sequence(x, y, 1, 1)) count++; // Diagonal derecha
        if (x <= dnaLength - sequenceLength && y >= sequenceLength - 1 && sequence(x, y, 1, -1)) count++; // Diagonal Izquierda

        return count;
    }

    for (let i = 0; i < dnaLength; i++) {
        for (let j = 0; j < dnaLength; j++) {
            sequenceCount += checkDirections(i, j);
        }
    }

    return sequenceCount > 1 ? true : false; // Retorna true si encuentra mas de 1 secuencia o false en caso contrario
}

