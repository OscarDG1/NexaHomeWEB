class Propiedad {
  constructor({
    id,
    email,
    metrosCuadrados,
    ciudad,
    provincia,
    calle,
    numero,
    precio,
    estado,
    parking,
    piscina,
    tipoPropiedad,
    planta,
    descripcion,
    habitacion,
    bano,
    orientacion,
    ascensor
  }) {
    this.id = id;
    this.email = email;
    this.metrosCuadrados = metrosCuadrados;
    this.ciudad = ciudad;
    this.provincia = provincia;
    this.calle = calle;
    this.numero = numero;
    this.precio = precio;
    this.estado = estado;
    this.parking = parking;
    this.piscina = piscina;
    this.tipoPropiedad = tipoPropiedad;
    this.planta = planta;
    this.descripcion = descripcion;
    this.habitacion = habitacion;
    this.bano = bano;
    this.orientacion = orientacion;
    this.ascensor = ascensor;
  }

  obtenerDescripcionBreve() {
    return `${this.tipoPropiedad} en ${this.calle}, ${this.ciudad}. ${this.metrosCuadrados} m², ${this.habitacion} habitaciones, ${this.bano} baños.`;
  }
}


export default Propiedad;