class Producto {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    calcularPrecioConDescuento(unidadesCompradas) {
        if (unidadesCompradas > 20) {
            return this.precio * 0.8;
        } else if (unidadesCompradas > 10) {
            return this.precio * 0.9;
        }
        return this.precio;
    }

    actualizarInventario(unidadesCompradas) {
        this.cantidad -= unidadesCompradas;
    }

    verificarAdvertenciaStock() {
        if (this.cantidad < 5) {
            console.warn(`Advertencia: El producto '${this.nombre}' está por agotarse (${this.cantidad} unidades restantes).`);
        }
    }
}

class Inventario {
    constructor() {
        this.productos = {};
    }

    agregarProducto(nombre, cantidad, precio) {
        this.productos[nombre] = new Producto(nombre, cantidad, precio);
    }

    registrarCompra(nombre, unidadesCompradas) {
        const producto = this.productos[nombre];
        if (producto) {
            if (unidadesCompradas > producto.cantidad) {
                console.error(`No hay suficiente inventario de '${nombre}' para la cantidad solicitada.`);
                return;
            }

            const precioConDescuento = producto.calcularPrecioConDescuento(unidadesCompradas);
            const total = precioConDescuento * unidadesCompradas;
            console.log(`Total a pagar por ${unidadesCompradas} unidades de '${nombre}': $${total.toFixed(2)}`);

            producto.actualizarInventario(unidadesCompradas);
            producto.verificarAdvertenciaStock();
        } else {
            console.error(`El producto '${nombre}' no existe en el inventario.`);
        }
    }

    mostrarInventario() {
        console.log("Inventario actual:");
        for (const [nombre, producto] of Object.entries(this.productos)) {
            console.log(`Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}, Precio: $${producto.precio.toFixed(2)}`);
        }
    }
}

// Ejemplo de uso
const inventario = new Inventario();
inventario.agregarProducto("Producto A", 30, 10.0);
inventario.agregarProducto("Producto B", 8, 20.0);
inventario.agregarProducto("Producto C", 4, 5.0);

// Muestra el inventario inicial
inventario.mostrarInventario();

// Registra una compra
console.log("\nCompra:");
inventario.registrarCompra("Producto A", 15);  // Compra con descuento del 10%
inventario.registrarCompra("Producto B", 3);   // Sin descuento
inventario.registrarCompra("Producto C", 2);   // Genera advertencia de stock bajo

// Muestra el inventario actualizado
console.log("\nInventario actualizado:");
inventario.mostrarInventario();
