# Snake Game — React + Vite

Juego clásico "Snake" implementado con React y Vite.

## Características

- Serpiente que crece al comer, con niveles de dificultad progresivos
- **Mejor puntaje** guardado automáticamente en el navegador (localStorage)
- **Pausa** con tecla `P` / `Escape` o con el botón del D-pad
- Controles táctiles (D-pad) para móviles
- Indicador de "¡Nuevo récord!" al superar la marca guardada

## Requisitos

- Node.js 16 o superior
- npm o yarn

## Instalación

```bash
git clone https://github.com/jsam1904/Lab-6-Snake.git   
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
# Abre http://localhost:5173 en el navegador
```

## Construir para producción

```bash
npm run build
npm run preview
```

## Cómo jugar

| Acción | Teclado | Botón |
| --- | --- | --- |
| Mover | `↑` `↓` `←` `→` | D-pad |
| Pausar / Reanudar | `P` o `Esc` | ⏸ en el D-pad |

- **Objetivo:** come la comida (naranja) para que la serpiente crezca y sumar puntos.
- **Niveles:** cada 50 puntos la velocidad aumenta.
- **Game over:** si la serpiente choca contra una pared o su propio cuerpo.
- **Récord:** se guarda automáticamente entre sesiones.

## Autor

- Nombre: Javier Alvarado
