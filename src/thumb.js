/**
 * Thumb.js - A lightweight, high-entropy browser fingerprint generator.
 * This is an open-source library by Jafran Hasan, Sr. Software Developer at WPPOOL.
 * Website: https://jafran.online
 *
 * Generates unique browser fingerprints based on various device and browser characteristics.
 * Each fingerprint is hash-based (SHA-256) for maximum uniqueness and security.
 */

export default class Thumb {
    constructor() {
      this.data = []  // Holds all the data points that contribute to the fingerprint
    }
  
    /**
     * Generates the unique fingerprint by collecting system/browser data 
     * and hashing it using SHA-256.
     * @returns {Promise<string>} The generated fingerprint hash
     */
    async get() {
      await this.collect()  // Collect the necessary data
      const raw = this.data.join('||')  // Join the collected data into a string
      const hash = await this.hash(raw)  // Generate the hash of the data
      return hash  // Return the fingerprint hash
    }
  
    /**
     * Collects various browser/device characteristics to generate a fingerprint.
     * This includes User Agent, screen resolution, canvas fingerprint, etc.
     */
    async collect() {
      this.data = [
        navigator.userAgent,  // User Agent string for browser identification
        navigator.language,  // User language setting
        screen.width + 'x' + screen.height + 'x' + screen.colorDepth,  // Screen resolution and color depth
        new Date().getTimezoneOffset(),  // Timezone offset
        this.getCanvas(),  // Canvas fingerprint for uniqueness
        await this.getAudio(),  // Audio context fingerprint (unique to device)
        this.getWebGL(),  // WebGL fingerprint (unique renderer info)
        navigator.maxTouchPoints,  // Number of touch points supported
        navigator.deviceMemory || 'unknown',  // Device memory (if available)
        navigator.hardwareConcurrency || 'unknown',  // Number of CPU cores
        Intl.DateTimeFormat().resolvedOptions().timeZone,  // Timezone
        navigator.doNotTrack,  // Do Not Track setting in the browser
        `${window.innerWidth}x${window.innerHeight}`,  // Window size
        this.getPlugins(),  // Installed browser plugins
        this.getColorGamut(),  // Color gamut of the screen (P3 or sRGB)
        this.getBattery(),  // Battery status (if available)
        this.getNetwork(),  // Network connection type (4G, WiFi, etc.)
        this.getNoise()  // Random noise for added entropy
      ]
    }
  
    /**
     * Generates a fingerprint based on the canvas rendering result.
     * This is unique to the specific device's GPU.
     * @returns {string} A base64-encoded string of the canvas content
     */
    getCanvas() {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx.textBaseline = 'top'
        ctx.font = '14px Arial'
        ctx.fillStyle = '#f60'
        ctx.fillRect(0, 0, 100, 40)
        ctx.fillStyle = '#069'
        ctx.fillText('🧠 Fingerprint!', 2, 2)
        return canvas.toDataURL()  // Return the base64-encoded string of the canvas
      } catch (e) {
        return 'canvas_unsupported'  // Fallback if canvas is unsupported
      }
    }
  
    /**
     * Generates an audio fingerprint by rendering an audio context and measuring the output.
     * @returns {Promise<string>} The audio fingerprint value (hash of the output)
     */
    async getAudio() {
      try {
        const ctx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100)
        const oscillator = ctx.createOscillator()
        const gain = ctx.createGain()
        oscillator.type = 'triangle'
        oscillator.frequency.value = 10000
        oscillator.connect(gain)
        gain.connect(ctx.destination)
        oscillator.start(0)
        ctx.startRendering()
        return new Promise(resolve => {
          ctx.oncomplete = event => {
            const buffer = event.renderedBuffer.getChannelData(0)
            let sum = 0
            for (let i = 0; i < buffer.length; i++) sum += Math.abs(buffer[i])
            resolve(sum.toString())  // Return the fingerprint (hash of the audio signal)
          }
        })
      } catch (e) {
        return 'audio_unsupported'  // Fallback if audio context is unsupported
      }
    }
  
    /**
     * Collects WebGL information, specifically the vendor and renderer information,
     * to uniquely identify the GPU.
     * @returns {string} WebGL renderer information
     */
    getWebGL() {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl')
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        return `${vendor}~${renderer}`  // Return the WebGL vendor and renderer information
      } catch (e) {
        return 'webgl_unsupported'  // Fallback if WebGL is unsupported
      }
    }
  
    /**
     * Retrieves the list of installed browser plugins.
     * @returns {string} A comma-separated list of plugin names
     */
    getPlugins() {
      try {
        return navigator.plugins ? [...navigator.plugins].map(p => p.name).join(',') : 'no_plugins'
      } catch (e) {
        return 'plugins_unsupported'  // Fallback if plugins are unsupported
      }
    }
  
    /**
     * Determines the color gamut of the device (P3 or sRGB).
     * @returns {string} The color gamut of the device
     */
    getColorGamut() {
      return window.matchMedia('(color-gamut: p3)').matches ? 'p3' : 'srgb'
    }
  
    /**
     * Retrieves the battery level of the device (if accessible).
     * @returns {Promise<string>} Battery level or 'battery_unsupported' if not accessible
     */
    getBattery() {
      return navigator.getBattery ? navigator.getBattery().then(battery => battery.level) : 'battery_unsupported'
    }
  
    /**
     * Retrieves the network connection type (e.g., WiFi, 4G).
     * @returns {string} Network connection type or 'network_unsupported'
     */
    getNetwork() {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      return connection ? connection.effectiveType : 'network_unsupported'
    }
  
    /**
     * Adds a random noise string for added entropy in fingerprint generation.
     * @returns {string} A random noise string
     */
    getNoise() {
      return Math.random().toString(36).substring(2, 15)  // Random string
    }
  
    /**
     * Generates a SHA-256 hash of the provided string.
     * @param {string} str The string to hash
     * @returns {Promise<string>} The SHA-256 hash of the string
     */
    async hash(str) {
      const msgUint8 = new TextEncoder().encode(str)  // Convert string to Uint8Array
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)  // Hash the data
      return Array.from(new Uint8Array(hashBuffer))  // Convert hash to hexadecimal
        .map(b => b.toString(16).padStart(2, '0'))  // Format as hex
        .join('')
    }
  }
  