export default class Serializable {
   constructor (savableProperties) {
  this.savableProperties = savableProperties
   } 

  // Serialize
  toJSON() {
    const serializeIfPossilbe = value => {
      if (value instanceof Serializable) {
        return value.toJSON()
      } else if (Array.isArray(value)) {
        return value.map(serializeIfPossilbe)
      } else if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, serializeIfPossilbe(value)]))
      } else {
        return value
      }
    }

    return Object.fromEntries(this.savableProperties.map(property => [property, serializeIfPossilbe(this[property])]))
  }

  // Deserialization helpers
  updated (properties) {
  Object.assign(this, properties)
  return this
  }
}