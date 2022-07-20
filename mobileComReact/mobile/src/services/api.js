import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

/**
 * ios com emulador: localhost
 * ios com físico: IP da máquina
 * Andorid com emulador: localhost (adb reverse)
 * android com emulador: 10.0.2.2(android studio)
 * android com emulador: 10.0.3.2(Genymotion)
 * android com físico: IP da máquina
 */