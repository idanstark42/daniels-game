export default class EventListener {
  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event, callback) {
    if (!this.listeners[event]) return

    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
  }

  emit(event, ...args) {
    if (!this.listeners[event]) return

    this.listeners[event].forEach(listener => listener(...args))
  }
} 